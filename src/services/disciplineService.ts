import disciplineRepository from "../repositories/disciplineRepository";

async function getIdDiscipline(id: number) {
  return disciplineRepository.getIdDiscipline(id);
}

async function getTerm(term: number) {
  return disciplineRepository.getTerm(term);
}

export default  {
  getIdDiscipline,
  getTerm,
};