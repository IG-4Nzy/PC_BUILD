﻿using PC_Build_Models;

namespace PC_Build_Service.Interface
{
	public interface IComponentTypeService
	{
		Return AddComponentType(string typeName);
		Return EditComponentType(PcComponentType pcComponentType);
		List<PcComponentType>? GetAllComponentTypes();
		Return DeleteComponentType(string id);
	}
}