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

		public Return AddComponentType(string typeName)
		{
			ExistCheck existCheck = adminDal.IsPcComponetTypeExists(typeName);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return adminDal.AddComponentType(typeName);
		}

		public Return AddComponent(PcComponet pcComponet)
		{
			ExistCheck existCheck = adminDal.IsPcComponetExists(pcComponet.Name);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return adminDal.AddComponent(pcComponet);
		}
	}
}