using PC_Build_Models;

namespace PC_Build_Service.Interface
{
	public interface IComponentService
	{
		Return AddComponent(PcComponet pcComponet);
		List<PcComponet>? GetAllPcComponents();
	}
}