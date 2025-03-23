using PC_Build_DAL;
using PC_Build_Models;

namespace PC_Build_Service
{
	public class ComponentService(IComponentDAL componentDAL) : IComponentService
	{
		private readonly IComponentDAL componentDAL = componentDAL;

		public Return AddComponentType(string typeName)
		{
			ExistCheck existCheck = componentDAL.IsPcComponetTypeExists(typeName);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return componentDAL.AddComponentType(typeName);
		}

		public Return AddComponent(PcComponet pcComponet)
		{
			ExistCheck existCheck = componentDAL.IsPcComponetExists(pcComponet.Name);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return componentDAL.AddComponent(pcComponet);
		}
	}
}