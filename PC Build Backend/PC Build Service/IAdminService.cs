using PC_Build_Models;

namespace PC_Build_Service
{
	public interface IAdminService
	{
		bool Login(LoginData loginData);
		Return AddComponentType(string typeName);
		Return AddComponent(PcComponet pcComponet);
	}
}