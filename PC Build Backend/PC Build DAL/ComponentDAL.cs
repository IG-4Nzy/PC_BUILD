﻿using System.Data;
using PC_Build_DAL.Interface;
using PC_Build_DatabaseFactory;
using PC_Build_Models;

namespace PC_Build_DAL
{
	public class ComponentDAL(IDatabaseFactory databaseFactory) : IComponentDAL
	{
		private readonly IDatabaseFactory databaseFactory = databaseFactory;

		public bool IsPcComponetExists(string componentName, string? id)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "select * from pc_component where name=@name ";
						if (id != null)
						{
							command.CommandText += "and id!=@id";
							command.Parameters.Add(databaseFactory.CreateDataParameter("@id", id));
						}
						command.CommandText += ";";
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", componentName));

						IDataReader reader = command.ExecuteReader();
						if (reader.Read())
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
				return true;
			}
		}

		public bool AddComponent(PcComponent pcComponent)
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
													"description" +
												") " +
												"values(" +
													"@id," +
													"@name," +
													"@type," +
													"@brand," +
													"@price," +
													"@rating," +
													"@description" +
												");";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", Guid.NewGuid().ToString()));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", pcComponent.Name!));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@type", pcComponent.Type!.Id!));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@brand", pcComponent.Brand!));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@price", pcComponent.Price));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@rating", pcComponent.Rating));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@description", pcComponent.Description!));

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

		public List<PcComponent>? GetAllComponentsInType(string typeId)
		{
			List<PcComponent> pcComponents = [];

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
													"pc_component_type.description pc_component_type_description," +
													"pc_component.description pc_component_description," +
													"price," +
													"rating " +
												"from pc_component " +
												"join pc_component_type " +
												"on pc_component.type=pc_component_type.id " +
												"where pc_component.type=@type;";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@type", typeId));

						IDataReader reader = command.ExecuteReader();
						while (reader.Read())
						{
							pcComponents.Add(new()
							{
								Id = reader["pc_component_id"].ToString(),
								Name = reader["pc_component_name"].ToString(),
								Type = new()
								{
									Id = reader["pc_component_type_id"].ToString(),
									Name = reader["pc_component_type_name"].ToString(),
									Description = reader["pc_component_type_description"].ToString(),
								},
								Brand = reader["brand"].ToString(),
								Description = reader["pc_component_description"].ToString(),
								Price = double.Parse(reader["price"].ToString() ?? "0"),
								Rating = double.Parse(reader["rating"].ToString() ?? "0")
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

		public bool EditComponent(PcComponent pcComponent)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "update pc_component " +
												"set " +
													"name=@name," +
													"type=@type," +
													"brand=@brand," +
													"description=@description," +
													"price=@price," +
													"rating=@rating " +
												"where id=@id;";

						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", pcComponent.Id!));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@name", pcComponent.Name!));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@type", pcComponent.Type!.Id!));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@brand", pcComponent.Brand!));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@description", pcComponent.Description!));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@price", pcComponent.Price));
						command.Parameters.Add(databaseFactory.CreateDataParameter("@rating", pcComponent.Rating));

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

		public bool DeleteComponent(string id)
		{
			try
			{
				using (IDbConnection connection = databaseFactory.CreateConnection())
				{
					using (IDbCommand command = connection.CreateCommand())
					{
						command.CommandText = "delete from pc_component where id=@id;";
						command.Parameters.Add(databaseFactory.CreateDataParameter("@id", id));

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