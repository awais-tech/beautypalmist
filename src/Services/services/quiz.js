import GenericServices from "./GenericServices";
class Quiz extends GenericServices {
  constructor() {
    super();
  }

  getQuiz = (id) => {
    return this.get("quiz/" + id);
  };

  
}
let quiz = new Quiz();
export default quiz;
