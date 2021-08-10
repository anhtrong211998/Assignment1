using AutoMapper;
using StudyRequrement.Categories;

namespace StudyRequrement
{
    public class StudyRequrementApplicationAutoMapperProfile : Profile
    {
        public StudyRequrementApplicationAutoMapperProfile()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<CreateUpdateCategoryDto, Category>();
        }
    }
}
