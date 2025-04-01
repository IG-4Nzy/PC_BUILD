using System.Data;
using PC_Build_DAL.Interface;
using PC_Build_DatabaseFactory;
using PC_Build_Models;

namespace PC_Build_DAL
{
	public class PreBuildDAL(IDatabaseFactory databaseFactory) : IPreBuildDAL
	{
		private readonly IDatabaseFactory databaseFactory = databaseFactory;

		public bool AddPreBuild(PreBuild preBuild)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						using (IDbTransaction transaction = command.Connection!.BeginTransaction())
						{
							command.CommandText = "insert into pre_build(" +
														"id," +
														"name," +
														"purpose," +
														"external_link" +
													") " +
													"values(" +
														"@id," +
														"@name," +
														"@purpose," +
														"@externalLink" +
														");";

							string preBuildId = Guid.NewGuid().ToString();
							command.Parameters.Add(databaseFactory.CreateDataParameter("@id", preBuildId));
							command.Parameters.Add(databaseFactory.CreateDataParameter("@name", preBuild.Name!));
							command.Parameters.Add(databaseFactory.CreateDataParameter("@purpose", preBuild.Purpose!));
							command.Parameters.Add(databaseFactory.CreateDataParameter("@externalLink", preBuild.ExternalLink!));

							if (command.ExecuteNonQuery() <= 0)
							{
								return false;
							}

							foreach (PcComponent pcComponent in preBuild.PcComponents!)
							{
								command.Parameters.Clear();
								if (!AddPreBuildComponents(pcComponent, preBuildId, command))
								{
									transaction.Rollback();
									return false;
								}
							}

							transaction.Commit();
							return true;
						}
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return false;
			}
		}

		private bool AddPreBuildComponents(PcComponent pcComponent, string preBuildId, IDbCommand command)
		{
			try
			{
				command.CommandText = "insert into pre_build_component(" +
											"pre_build_id," +
											"component_id" +
										") " +
										"values(" +
											"@pre_build_id," +
											"@component_id" +
											");";

				command.Parameters.Add(databaseFactory.CreateDataParameter("@component_id", pcComponent.Id!));
				command.Parameters.Add(databaseFactory.CreateDataParameter("@pre_build_id", preBuildId));

				if (command.ExecuteNonQuery() > 0)
				{
					return true;
				}
				return false;
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return false;
			}
		}

		public List<PreBuild>? GetPreBuild(string purpose)
		{
			List<PreBuild> preBuilds = [];

			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "select * " +
												"from pre_build " +
												"where purpose=@purpose;";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@purpose", purpose));

						IDataReader reader = command.ExecuteReader();

						while (reader.Read())
						{
							PreBuild preBuild = new()
							{
								Id = reader["id"].ToString(),
								Name = reader["name"].ToString(),
								Purpose = purpose,
								ExternalLink = reader["external_link"].ToString(),
							};

							List<PcComponent>? pcComponents = GetPreBuildComponents(preBuild.Id);

							if (null != pcComponents)
							{
								preBuild.PcComponents = pcComponents;
							}
							else
							{
								return null;
							}

							preBuilds.Add(preBuild);
						}

						return preBuilds;
					}
				}
			} 
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return null;
			}
		}

		private List<PcComponent>? GetPreBuildComponents(string preBuildId)
		{
			List<PcComponent> pcComponents = [];

			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "select " +
													"pc.id pc_id," +
													"pc.name pc_name," +
													"pc.type pc_type," +
													"pct.name pct_name," +
													"pc.brand pc_brand," +
													"pc.price pc_price," +
													"pc.description pc_description " +
												"from pre_build_component pbc " +
												"join pc_component pc " +
												"on pc.id=pbc.component_id " +
												"join pc_component_type pct " +
												"on pct.id=pc.type " +
												"where pbc.pre_build_id=@preBuildId;";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@preBuildId", preBuildId));

						IDataReader reader = command.ExecuteReader();

						while (reader.Read())
						{
							pcComponents.Add(new()
							{
								Id = reader["pc_id"].ToString(),
								Name = reader["pc_name"].ToString(),
								Type = new()
								{
									Id = reader["pc_type"].ToString(),
									Name = reader["pct_name"].ToString(),
								},
								Brand = reader["pc_brand"].ToString(),
								Price = double.Parse(reader["pc_price"].ToString()),
								Description = reader["pc_description"].ToString(),
							});
						}

						return pcComponents;
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return null;
			}
		}

		public bool DeletePreBuild(string preBuildId)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "delete from pre_build where id=@id;";
						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", preBuildId));

						if (command.ExecuteNonQuery() > 0)
						{
							return true;
						}
						return false;
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return false;
			}
		}
	}
}