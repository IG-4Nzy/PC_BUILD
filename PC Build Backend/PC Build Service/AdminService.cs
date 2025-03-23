using PC_Build_DAL.Interface;
using PC_Build_Models;
using PC_Build_Service.Interface;

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