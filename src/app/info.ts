import { parse, differenceInYears } from "date-fns";

const calculateAge = () => {
  const BIRTHDAY = "08-06-2003";
  const dateFormat = "dd-MM-yyyy";
  const birthDate = parse(BIRTHDAY, dateFormat, new Date());
  return differenceInYears(new Date(), birthDate);
};

export const title = "Fabian Waller";
// export const description = `${calculateAge()} year old computer science student at Saarland University obsessed with fullstack web development at Ergosign.`;
export const description = `Computer science student at Saarland University obsessed with fullstack web development working at Ergosign.`;
