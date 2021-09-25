import listening from "../assets/images/headphone.png";
import read from "../assets/images/books.png";
import write from "../assets/images/write.png";
// import speak from "../assets/images/chats.png";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { GET_EXAM_QUES } from "../api/queries";
import { IExamQues } from "../types/Quiz";

const ExamStart = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<IExamQues>(GET_EXAM_QUES, {
    variables: {
      user: user?.id,
    },
  });

  function groupBy(list: any[], key: string) {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  const people = [
    { sex: "Male", name: "Jeff" },
    { sex: "Female", name: "Megan" },
    { sex: "Male", name: "Taylor" },
    { sex: "Female", name: "Madison" },
  ];
  const groupedPeople = groupBy(people, "sex");
  console.log(groupedPeople.Male);
  console.log(groupedPeople.Female);

  const exams_exam_question = [
    {
      exam_id: "7783fac9-eb24-4ce3-be7b-c0799763b821",
      id: "f80f2566-4fdb-4a34-803b-dc7726518dc2",
      order: 11,
      question: {
        question: "The best time to drink coffee is",
        solution: "",
        correct_answer: "1",
        created_at: "2021-09-15T08:42:03.448713+00:00",
        id: "896c546b-443f-401a-9dd6-4900e3d28db1",
        image_link: null,
        options: [
          "mid-afternoon",
          "10 p.m.",
          "only when feeling anxious",
          "after dinner",
        ],
        part: {
          name: "Reading",
          id: 4,
        },
        context: {
          context_type: {
            name: "passage",
          },
          details:
            "PASSAGE 1 MAKING TIME FOR SCIENCE You should spend about 20 minutes on Questions 1-13, which are based on Reading Passage 1 below.Chronobiology might sound a little futuristic - like something from a science fiction novel, perhaps - but it's actually a field of study that concerns one of the oldest processes life on this planet has ever known: short-term rhythms of time and their effect on flora and fauna.This can take many forms. Marine life, for example, is influenced by tidal patterns. Animals tend to be active or inactive depending on the position of the sun or moon. Numerous creatures, humans included, are largely diurnal - that is, they like to come out during the hours of sunlight. Nocturnal animals, such as bats and possums, prefer to forage by night. A third group are known as crepuscular: they thrive in the low-light of dawn and dusk and remain inactive at other hours.When it comes to humans, chronobiologists are interested in what is known as the circadian rhythm. This is the complete cycle our bodies are naturally geared to undergo within the passage of a twenty-four hour day. Aside from sleeping at night and waking during the day, each cycle involves many other factors such as changes in blood pressure and body temperature. Not everyone has an identical circadian rhythm. 'Night people', for example, often describe how they find it very hard to operate during the morning, but become alert and focused by evening. This is a benign variation within circadian rhythms known as a chronotype.Scientists have limited abilities to create durable modifications of chronobiological demands. Recent therapeutic developments for humans such as artificial light machines and melatonin administration can reset our circadian rhythms, for example, but our bodies can tell the difference and health suffers when we breach these natural rhythms for extended periods of time. Plants appear no more malleable in this respect; studies demonstrate that vegetables grown in season and ripened on the tree are far higher in essential nutrients than those grown in greenhouses and ripened by laser.Knowledge of chronobiological patterns can have many pragmatic implications for our day-to-day lives. While contemporary living can sometimes appear to subjugate biology - after all, who needs circadian rhythms when we have caffeine pills, energy drinks, shift work and cities that never sleep? - keeping in synch with our body clock is important.The average urban resident, for example, rouses at the eye-blearing time of 6.04 a.m., which researchers believe to be far too early. One study found that even rising at 7.00 a.m. has deleterious effects on health unless exercise is performed for 30 minutes afterward. The optimum moment has been whittled down to 7.22 a.m.; muscle aches, headaches and moodiness were reported to be lowest by participants in the study who awoke then.Once you're up and ready to go, what then? If you're trying to shed some extra pounds, dieticians are adamant: never skip breakfast. This disorients your circadian rhythm and puts your body in starvation mode. The recommended course of action is to follow an intense workout with a carbohydrate-rich breakfast; the other way round and weight loss results are not as pronounced.Morning is also great for breaking out the vitamins. Supplement absorption by the body is not temporal-dependent, but naturopath Pam Stone notes that the extra boost at breakfast helps us get energised for the day ahead. For improved absorption, Stone suggests pairing supplements with a food in which they are soluble and steering clear of caffeinated beverages. Finally, Stone warns to take care with storage; high potency is best for absorption, and warmth and humidity are known to deplete the potency of a supplement.After-dinner espressos are becoming more of a tradition - we have the Italians to thank for that - but to prepare for a good night's sleep we are better off putting the brakes on caffeine consumption as early as 3 p.m. With a seven hour half-life, a cup of coffee containing 90 mg of caffeine taken at this hour could still leave 45 mg of caffeine in your nervous system at ten o'clock that evening. It is essential that, by the time you are ready to sleep, your body is rid of all traces.Evenings are important for winding down before sleep; however, dietician Geraldine Georgeou warns that an after-five carbohydrate-fast is more cultural myth than chronobiological demand. This will deprive your body of vital energy needs. Overloading your gut could lead to indigestion, though. Our digestive tracts do not shut down for the night entirely, but their work slows to a crawl as our bodies prepare for sleep. Consuming a modest snack should be entirely sufficient.",
          image_link: null,
          link: null,
        },
        type_of_question: {
          id: 2,
          name: "multiple_choice_question",
        },
      },
    },

    {
      exam_id: "7783fac9-eb24-4ce3-be7b-c0799763b821",
      id: "c6f14231-3b65-4bb8-be25-db460cb4d5ed",
      order: 37,
      question: {
        context: {
          context_type: {
            name: "audio",
          },
          details: "https://minio.app.pariqsha.com/pariqsha/audio/Audio1.mp3",
          image_link: null,
          link: null,
        },
        correct_answer: "July",
        created_at: "2021-09-16T09:04:22.387997+00:00",
        id: "c43a6761-0646-4ce4-a32c-d539f7b3ab55",
        image_link: null,
        options: [],
        part: {
          name: "Listening",
          id: 5,
        },
        question: "Open in: _______",
        solution: "",
        type_of_question: {
          id: 4,
          name: "fill_in_the_blanks",
        },
      },
    },

    {
      exam_id: "7783fac9-eb24-4ce3-be7b-c0799763b821",
      id: "21e0b12d-e59a-4963-8fcc-9b0ed89991a1",
      order: 74,
      question: {
        context: {
          context_type: {
            name: "image",
          },
          details:
            "https://minio.app.pariqsha.com/pariqsha/audio/AcademicWritingTask1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20210920%2F%2Fs3%2Faws4_request&X-Amz-Date=20210920T075720Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=4a4d1378c9a102767b6c29c9016ba672e3ddad50bea16c2ca97b81cca8be74b7",
          image_link: null,
          link: null,
        },
        correct_answer: "",
        created_at: "2021-09-20T07:59:25.709646+00:00",
        id: "5858ef71-c6cb-4657-801e-d2766de23a2a",
        image_link: null,
        options: [],
        part: {
          name: "Writing",
          id: 6,
        },
        question:
          "The pie graphs below show the result of a survey of children's activities. The first graph shows the cultural and leisure activities that boys participate in, whereas the second graph shows the activities in which the girls participate. Write a report describing the information shown in the two pie graphs. Write at least 150 words",
        solution: "",
        type_of_question: {
          id: 5,
          name: "long_answer",
        },
      },
    },
  ];

  const part_name = exams_exam_question[0].question.part;

  console.log(part_name);

  const groupedQues = groupBy(exams_exam_question, "question");
  console.log(groupedQues.Reading);
  console.log(groupedQues.Listening);
  console.log(groupedQues.Writing);

  return (
    <div className="h-full flex-col flex-1 flex">
      <div className="common-btn p-10 py-16 flex-1">
        <p className="text-xl leading-normal md:w-1/2 md:mx-auto ">
          Get lots of practical
          <br /> tips for the Listening,
          <br />
          Reading, Writing and Speaking sections to help you achieve your
          desired score
        </p>
      </div>
      <div className=" p-6 rounded-3xl -mt-10 md:w-1/2 md:mx-auto bg-white ">
        <ul>
          <li
            role="button"
            onClick={() => history.push(`/reading/${id}`)}
            className="list-style animation"
          >
            Reading
            <span>
              <img src={read} className="h-8 w-8 " alt="pariqsha reading" />
            </span>
          </li>

          <li
            role="button"
            onClick={() => history.push(`/listining/${id}`)}
            className="list-style animation"
          >
            Listening
            <span>
              <img
                src={listening}
                className="h-8 w-8 "
                alt="pariqsha listening"
              />
            </span>
          </li>
          <li
            role="button"
            onClick={() => history.push(`/writing/${data}`)}
            className="list-style animation"
          >
            Writing
            <span>
              <img src={write} className="h-8 w-8 " alt="pariqsha write" />
            </span>
          </li>
          {/* <li className="list-style animation">
            Speaking
            <span>
              <img src={speak} className="h-8 w-8 " alt="pariqsha speak" />
            </span>
          </li>
          <li className="list-style animation">
            4 Module Quiz
            <span>
              <img src={speak} className="h-8 w-8 " alt="pariqsha speak" />
            </span>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default ExamStart;
