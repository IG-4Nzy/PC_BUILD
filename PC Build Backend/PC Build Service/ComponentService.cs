using PC_Build_DAL.Interface;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Service
{
	public class ComponentService(IComponentDAL componentDAL) : IComponentService
	{
		private readonly IComponentDAL componentDAL = componentDAL;

		public Return AddComponent(PcComponet pcComponet)
		{
			pcComponet.Name = pcComponet.Name.Trim();
			pcComponet.Type.Id = pcComponet.Type.Id.Trim();
			pcComponet.Brand = pcComponet.Brand.Trim();
			pcComponet.Description = pcComponet.Description.Trim();

			if (string.IsNullOrEmpty(pcComponet.Name) ||
				string.IsNullOrEmpty(pcComponet.Type.Id) ||
				string.IsNullOrEmpty(pcComponet.Brand) ||
				string.IsNullOrEmpty(pcComponet.Description) ||
				string.IsNullOrWhiteSpace(pcComponet.Image) ||
				pcComponet.Price <= 0 ||
				pcComponet.Rating <= 0 ||
				pcComponet.Rating > 10)
			{
				return Return.BAD_REQUEST;
			}

			ExistCheck existCheck = componentDAL.IsPcComponetExists(pcComponet.Name);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return componentDAL.AddComponent(pcComponet);
		}

		public List<PcComponet>? GetAllPcComponents()
		{
			return componentDAL.GetAllPcComponents();
		}
	}
}