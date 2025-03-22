using PC_Build_Models;

namespace PC_Build_DAL
{
    public interface IAdminDAL
    {
        bool Login(LoginData loginData);
        ExistCheck IsPcComponetExists(string componentName);
        Return AddComponent(PcComponet pcComponet);
    }
}