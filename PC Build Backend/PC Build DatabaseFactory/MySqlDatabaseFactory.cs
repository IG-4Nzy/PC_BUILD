using System.Data;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace PC_Build_DatabaseFactory
{
    public class MySqlDatabaseFactory : IDatabaseFactory
    {
        public string ConnectionString { get; protected set; } = string.Empty;

        public MySqlDatabaseFactory(IConfiguration configuration)
        {
            ConnectionString = configuration.GetConnectionString("ConnectionString") ?? ConnectionString;
        }

        public IDbConnection CreateConnection()
        {
            IDbConnection connection = new MySqlConnection(ConnectionString);
            connection.Open();
            return connection;
        }

        public IDbDataParameter CreateDataParameter(string parameterName, object value)
        {
            return new MySqlParameter(parameterName, value);
        }
    }
}