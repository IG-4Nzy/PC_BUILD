using PC_Build_Models;

namespace PC_Build_Service
{
	public interface IComponentService
	{
		Return AddComponentType(string typeName);
		Return AddComponent(PcComponet pcComponet);
	}
}