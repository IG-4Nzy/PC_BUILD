using System.Data;

namespace PC_Build_DatabaseFactory
{
    public interface IDatabaseFactory
    {
        IDbConnection CreateConnection();
        IDbDataParameter CreateDataParameter(string parameterName, object value);
    }
}