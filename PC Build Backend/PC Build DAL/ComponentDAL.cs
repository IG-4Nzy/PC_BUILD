using System.Data;
using PC_Build_DatabaseFactory;
using PC_Build_Models;

namespace PC_Build_DAL
{
	public class ComponentDAL(IDatabaseFactory databaseFactory) : IComponentDAL
	{
		private readonly IDatabaseFactory databaseFactory = databaseFactory;

		public ExistCheck IsPcComponetTypeExists(string typeName)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "select * from pc_component_type where name=@name;";
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", typeName));

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

		public Return AddComponentType(string typeName)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "insert into pc_componet(" +
													"id," +
													"name," +
												") " +
												"values(" +
													"@id," +
													"@name," +
												");";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", Guid.NewGuid().ToString()));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", typeName));

						if (command.ExecuteNonQuery() > 0)
						{
							return Return.OK;
						}
						return Return.NOT_ADDED;
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return Return.DB_ERROR;
			}
		}

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
						command.CommandText = "insert into pc_componet(" +
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
						command.Parameters.Add(databaseFactory.CreateDataParameter("@type", pcComponet.Type));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@brand", pcComponet.Brand));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@price", pcComponet.Price));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@rating", pcComponet.Rating));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@image", pcComponet.Image));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@description", pcComponet.Description));

						if (command.ExecuteNonQuery() > 0)
						{
							return Return.OK;
						}
						return Return.NOT_ADDED;
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return Return.DB_ERROR;
			}
		}
	}
}