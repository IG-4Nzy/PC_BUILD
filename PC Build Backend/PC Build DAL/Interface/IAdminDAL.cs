using PC_Build_Models;

namespace PC_Build_DAL.Interface
{
	public interface IAdminDAL
	{
		bool Login(LoginData loginData);
	}
}