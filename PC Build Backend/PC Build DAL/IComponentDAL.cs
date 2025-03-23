using PC_Build_Models;

namespace PC_Build_DAL
{
	public interface IComponentDAL
	{
		ExistCheck IsPcComponetTypeExists(string typeName);
		Return AddComponentType(string typeName);
		ExistCheck IsPcComponetExists(string componentName);
		Return AddComponent(PcComponet pcComponet);
	}
}