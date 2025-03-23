using PC_Build_Models;

namespace PC_Build_Service.Interface
{
	public interface IAdminService
	{
		bool Login(LoginData loginData);
	}
}