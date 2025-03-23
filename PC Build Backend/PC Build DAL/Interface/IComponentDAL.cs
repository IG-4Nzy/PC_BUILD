using PC_Build_Models;

namespace PC_Build_DAL.Interface
{
	public interface IComponentDAL
	{
		ExistCheck IsPcComponetExists(string componentName);
		Return AddComponent(PcComponet pcComponet);
	}
}