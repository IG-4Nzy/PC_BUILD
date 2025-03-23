using PC_Build_DAL;
using PC_Build_Models;

namespace PC_Build_Service
{
	public class AdminService(IAdminDAL adminDAL) : IAdminService
	{
		private readonly IAdminDAL adminDal = adminDAL;

		public bool Login(LoginData loginData)
		{
			return adminDal.Login(loginData);
		}
	}
}