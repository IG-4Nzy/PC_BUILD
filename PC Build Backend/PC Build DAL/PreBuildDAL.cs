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
								if (!AddPreBuildComponents(pcComponent, preBuildId, command))
								{
									transaction.Rollback();
									return false;
								}
							}

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
				command.CommandText = "insert into pre_build(" +
											"pre_build_id," +
											"component_id" +
										") " +
										"values(" +
											"@pre_build_id," +
											"@component_id" +
											");";

				command.Parameters.Add(databaseFactory.CreateDataParameter("@id", Guid.NewGuid().ToString()));
				command.Parameters.Add(databaseFactory.CreateDataParameter("@name", pcComponent.Id!));
				command.Parameters.Add(databaseFactory.CreateDataParameter("@purpose", preBuildId));

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
	}
}