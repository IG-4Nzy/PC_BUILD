using System.Data;
using PC_Build_DatabaseFactory;
using PC_Build_Models;

namespace PC_Build_DAL
{
    public class AdminDAL(IDatabaseFactory databaseFactory) : IAdminDAL
    {
        private readonly IDatabaseFactory databaseFactory = databaseFactory;

        public bool Login(LoginData loginData)
        {
            using (IDbConnection connection = databaseFactory.CreateConnection())
            {
                using (IDbCommand command = connection.CreateCommand())
                {
                    command.CommandText = "select * from admin where userid=@userId and password=@password;";
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
    }
}