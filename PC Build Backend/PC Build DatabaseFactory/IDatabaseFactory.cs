using System.Data;

namespace PC_Build_DatabaseFactory
{
    public interface IDatabaseFactory
    {
        IDbConnection CreateConnection();
        IDbCommand CreateCommand(IDbConnection connection);
        IDbDataParameter CreateDataParameter(string parameterName, object value);
    }
}