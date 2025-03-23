using PC_Build_DAL.Interface;
using PC_Build_DatabaseFactory;
using PC_Build_Models;
using System.Data;

namespace PC_Build_DAL
{
	public class ComponentTypeDAL(IDatabaseFactory databaseFactory) : IComponentTypeDAL
	{
		private readonly IDatabaseFactory databaseFactory = databaseFactory;

		public ExistCheck IsPcComponetTypeExists(string typeName, string? id)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "select * from pc_component_type where name=@name";
						if (!string.IsNullOrEmpty(id))
						{
							command.CommandText += " and id!=@id";
							command.Parameters.Add(databaseFactory.CreateDataParameter("@id", id));
						}
						command.CommandText += ";";
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

		public Return AddComponentType(PcComponentType pcComponentType)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "insert into pc_component_type(" +
													"id," +
													"name," +
													"description" +
												") " +
												"values(" +
													"@id," +
													"@name," +
													"@description" +
												");";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", Guid.NewGuid().ToString()));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", pcComponentType.Name));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@description", pcComponentType.Description));

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

		public Return EditComponentType(PcComponentType pcComponentType)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "update pc_component_type " +
												"set " +
													"name=@name," +
													"description=@description " +
												"where id=@id;";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", pcComponentType.Id));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", pcComponentType.Name));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@description", pcComponentType.Description));

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

		public List<PcComponentType>? GetAllComponentTypes()
		{
			List<PcComponentType> pcComponentTypes = [];

			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "select * from pc_component_type;";

						IDataReader reader = command.ExecuteReader();
						while (reader.Read())
						{
							pcComponentTypes.Add(new()
							{
								Id = reader["id"].ToString(),
								Name = reader["name"].ToString(),
								Description = reader["description"].ToString()
							});
						}
						return pcComponentTypes;
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return null;
			}
		}

		public Return DeleteComponentType(string id)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "delete from pc_component_type where id=@id;";
						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", id));

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
	}
}