﻿using System.Data;
using PC_Build_DatabaseFactory;
using PC_Build_Models;

namespace PC_Build_DAL
{
    public class AdminDAL(IDatabaseFactory databaseFactory) : IAdminDAL
    {
        private readonly IDatabaseFactory databaseFactory = databaseFactory;

        public bool Login(LoginData loginData)
        {
            try
            {
                using (IDbConnection connection = databaseFactory.CreateConnection())
                {
                    using (IDbCommand command = connection.CreateCommand())
                    {
                        command.CommandText = "select * from admin where user_id=@userId and password=@password;";
                        command.Parameters.Add(databaseFactory.CreateDataParameter("@userId", loginData.UserId));
                        command.Parameters.Add(databaseFactory.CreateDataParameter("@password", loginData.Password));

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
                return false;
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
            //try
            //{
            //    using (IDbConnection connection = databaseFactory.CreateConnection())
            //    {
            //        using (IDbCommand command = connection.CreateCommand())
            //        {
            //            command.CommandText = "insert into pc_componet(" +
            //                                    ") * from pc_component where name=@name;";
            //            command.Parameters.Add(databaseFactory.CreateDataParameter("@name", componentName));

            //            IDataReader reader = command.ExecuteReader();
            //            if (reader.Read())
            //            {
            //                return ExistCheck.EXISTS;
            //            }
            //            return ExistCheck.NOT_EXIST;
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine(ex.Message);
            //    return ExistCheck.ERROR;
            //}
            return Return.OK;
        }
    }
}