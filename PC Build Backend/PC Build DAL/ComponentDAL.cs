using System.Data;
using PC_Build_DAL.Interface;
using PC_Build_DatabaseFactory;
using PC_Build_Models;

namespace PC_Build_DAL
{
	public class ComponentDAL(IDatabaseFactory databaseFactory) : IComponentDAL
	{
		private readonly IDatabaseFactory databaseFactory = databaseFactory;

		public ExistCheck IsPcComponetExists(string componentName)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "select * from pc_component where name=@name;";
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", componentName));

						IDataReader reader = command.ExecuteReader();
						if (reader.Read())
						{
							return ExistCheck.EXISTS;
						}
						return ExistCheck.NOT_EXIST;
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return ExistCheck.ERROR;
			}
		}

		public Return AddComponent(PcComponet pcComponet)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "insert into pc_component(" +
													"id," +
													"name," +
													"type," +
													"brand," +
													"price," +
													"rating," +
													"image," +
													"description" +
												") " +
												"values(" +
													"@id," +
													"@name," +
													"@type," +
													"@brand," +
													"@price," +
													"@rating," +
													"@image," +
													"@description" +
												");";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", Guid.NewGuid().ToString()));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", pcComponet.Name));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@type", pcComponet.Type.Id));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@brand", pcComponet.Brand));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@price", pcComponet.Price));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@rating", pcComponet.Rating));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@image", pcComponet.Image));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@description", pcComponet.Description));

						if (command.ExecuteNonQuery() > 0)
						{
							return Return.OK;
						}
						return Return.DB_NOT_UPDATED;
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return Return.DB_ERROR;
			}
		}

		public List<PcComponet>? GetAllPcComponents()
		{
			List<PcComponet> pcComponets = [];

			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "select " +
													"pc_component.id pc_component_id," +
													"pc_component.name pc_component_name," +
													"pc_component_type.id pc_component_type_id," +
													"pc_component_type.name pc_component_type_name," +
													"brand," +
													"description," +
													"image," +
													"price," +
													"rating " +
												"from pc_component " +
												"join pc_component_type " +
												"on pc_component.type=pc_component_type.id;";

						IDataReader reader = command.ExecuteReader();
						while (reader.Read())
						{
							pcComponets.Add(new()
							{
								Id = reader["pc_component_id"].ToString(),
								Name = reader["pc_component_name"].ToString(),
								Type = new()
								{
									Id = reader["pc_component_type_id"].ToString(),
									Name = reader["pc_component_type_name"].ToString()
								},
								Brand = reader["brand"].ToString(),
								Description = reader["description"].ToString(),
								Image = reader["image"].ToString(),
								Price = double.Parse(reader["price"].ToString()),
								Rating = double.Parse(reader["rating"].ToString())
							});
						}
						return pcComponets;
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return null;
			}
		}
	}
}