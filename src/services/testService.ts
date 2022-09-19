import { badRequestError, notFoundError } from "../utils/errorUtils";
import { TCreateTestData } from "../utils/typeUtils";
import {categoryService} from "./categoryService";
import { disciplineService } from "./disciplineService";
import { teacherService } from "./teacherService";
import teacherDisciplineService from "../services/teacherDisciplineService";
import testRepository from "../repositories/testRepository";
import { IOption } from "../utils/interfaceUtils";
import optionService from "./optionService";


  async function insertTest(createTestData: TCreateTestData) {
    const { categoryId, teacherId, disciplineId, name, pdfUrl } = createTestData;
  
    const existingCategory = await categoryService.getIdCategory(categoryId);
    if (!existingCategory) throw badRequestError("Category doesn't exist");
  
    const existingDiscipline = await disciplineService.getIdDiscipline(disciplineId);
    if (!existingDiscipline) throw badRequestError("Discipline doesn't exist");
  
    const existingTeacher = await teacherService.getIdTeacher(teacherId);
    if (!existingTeacher) throw badRequestError("Teacher doesn't exist");
  
    const teacherDiscipline = await teacherDisciplineService.getTeacherAndDiscipline(teacherId, disciplineId);
    
    if (!teacherDiscipline) {
      throw badRequestError("Teacher doesn't teach this discipline");
    }
  
    await testRepository.insertTest({
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId: teacherDiscipline.id,
    });
  }
  
  async function viewTest(id: number) {
    const test = await testRepository.getIdTest(id);
    if (!test) throw notFoundError();
  
    await testRepository.viewTest(id);
  }
  
  async function findTest(option: IOption) {
    const { groupBy } = option;
    if (groupBy === "disciplines") {
      return optionService.optionDisciplines(option)
    } 
    if (groupBy === "teachers") {
      return optionService.optionTeachers(option)
    }
  }
  
  const testService =  {
    findTest,
    insertTest,
    viewTest,
  };
  
  export default testService;