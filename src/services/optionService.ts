import { Category, Term, Test } from "@prisma/client";
import { IOption } from "../utils/interfaceUtils";
import categoryRepository from "../repositories/categoryRepository";
import testRepository from "../repositories/testRepository";

async function optionDisciplines(option: IOption) {
    const terms = await testRepository.getTestsDiscipline(option.discipline);
    const categories = await categoryRepository.findMany();
  
    return terms.map(term => buildTermsWithDisciplinesAndCategories(term, categories));
  }
  
async function optionTeachers(option: IOption) {
    const teachersDisciplines = await testRepository.getTestsTeachers(option.teacher);
    const testsTeachers = groupTestsTeacher(teachersDisciplines);
    
    const categories = await categoryRepository.findMany();
    return groupTestsFromTeachersInCategories(testsTeachers, categories);
  }
  
function groupTestsFromTeachersInCategories(testsTeachersMap: Map<string, { tests: Test[] }>, categories: Category[]) {
    const teacherTestsGroupCategories = [];
    
    const teachers = Array.from(testsTeachersMap.keys());
    teachers.forEach((teacher) => {
      const categoriesMapForTeacher = buildCategoriesMap(categories);
      const { tests } = testsTeachersMap.get(teacher);
      arrangeTestsInCategories(categoriesMapForTeacher, tests);
      teacherTestsGroupCategories.push({
        teacher,
        categories: Array.from(categoriesMapForTeacher.values())
      })
    });
  
    return teacherTestsGroupCategories;
  }
  
  function arrangeTestsInCategories(categoriesMap, tests) {
    tests.forEach(test => {
      const categoryGroup = categoriesMap.get(test.categoryId);
      categoryGroup.tests.push({ test });
    });
  }
  
  function groupTestsTeacher(teachersDisciplines) {
    const teachers = getUniqueTeachers(teachersDisciplines);
    const teachersMap = buildTeachersMap(teachers);
    
    teachersDisciplines.forEach(teacherDiscipline => {
      const discipline = teacherDiscipline.discipline;
      const teacherFromMap = teachersMap.get(teacherDiscipline.teacher.name);
      const tests = teacherDiscipline.tests;
      tests.forEach(test => {
        teacherFromMap.tests.push({...test, discipline});
      });
    })
    
    return teachersMap;
  }
  
  function getUniqueTeachers(teacherDiscipline) {
    const teachersSet = new Set<string>(teacherDiscipline.map(teacherDiscipline => teacherDiscipline.teacher.name))
    return Array.from(teachersSet); 
  }
  
  function buildTermsWithDisciplinesAndCategories(term: Term, categories: Category[]) {
    const categoriesMap = buildCategoriesMap(categories);
    const newTerm: any = {...term};
    newTerm.disciplines.forEach(discipline => {
      const teacherDisciplines = discipline.teacherDisciplines;
      teacherDisciplines.forEach(teacherDiscipline => groupTestsCategory(categoriesMap, teacherDiscipline));
      discipline.categories = Array.from(categoriesMap.values());
    });
  
    return newTerm;
  }
  
  function buildCategoriesMap(categories: Category[]) {
    const categoriesMap = new Map<number, { name: string, tests: Test[] }>();
    categories.forEach(category => {
      categoriesMap.set(category.id, { name: category.name, tests: [] });
    });
  
    return categoriesMap;
  }
  
  function buildTeachersMap(teachers: string[]) {
    const teachersMap = new Map<string, {tests: Test[]}>();
    teachers.forEach(teacher => {
      teachersMap.set(teacher, { tests: [] });
    })
  
    return teachersMap;
  }
  
  function groupTestsCategory(categoriesMap, teacherDiscipline) {
    const tests = teacherDiscipline.tests;
    tests.forEach(test => {
      const categoryGroup = categoriesMap.get(test.categoryId);
      categoryGroup.tests.push({
        test,
        teacher: teacherDiscipline.teacher
      })
    })
  }
  
  export default{
    optionDisciplines,
    optionTeachers
  }