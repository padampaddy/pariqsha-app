import BaseLayout from "../layouts/Base";
import QuestionType from "../components/QuestionType";
import QuizHeader from "../components/QuizHeader";

const Reading = () => {
  return (
    <div className="">
      <BaseLayout showBack title="Reading">
        <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
          <QuizHeader title="Time Limit 40 Minutes " />
          <div className="flex-1 bg-white shadow-md mx-4 mb-4 overflow-y-auto">
            <div className=" p-6 ">
              <QuestionType title="Read Passage and Match The Following" />
              <div className="mt-5">
                <p className="text-sm">
                  {`Chronobiology might sound a little futuristic - like something
                  from a science fiction novel, perhaps - but it's actually a
                  field of study that concerns one of the oldest processes life
                  on this planet has ever known: short-term rhythms of time and
                  their effect on flora and fauna. This can take many forms.
                  Marine life, for example, is influenced by tidal patterns.
                  Animals tend to be active or inactive depending on the
                  position of the sun or moon. Numerous creatures, humans
                  included, are largely diurnal - that is, they like to come out
                  during the hours of sunlight. Nocturnal animals, such as bats
                  and possums, prefer to forage by night. A third group are
                  known as crepuscular: they thrive in the low light of dawn and
                  dusk and remain inactive at other hours. When it comes to
                  humans, chrono biologists are interested in what is known as
                  the circadian rhythm. This is the complete cycle our bodies
                  are naturally geared to undergo within the passage of a
                  twenty-four-hour day. Aside from sleeping at night and waking
                  during the day, each cycle involves many other factors such as
                  changes in blood pressure and body temperature. Not everyone
                  has an identical circadian rhythm. 'Night people', for
                  example, often describe how they find it very hard to operate
                  during the morning but become alert and focused by evening.
                  This is a benign variation within circadian rhythms known as a
                  chronotype. Scientists have limited abilities to create
                  durable modifications of chronobiological demands. Recent
                  therapeutic developments for humans such as artificial light
                  machines and melatonin administration can reset our circadian
                  rhythms, for example, but our bodies can tell the difference
                  and health suffers when we breach these natural rhythms for
                  extended periods of time. Plants appear no more malleable in
                  this respect; studies demonstrate that vegetables grown in
                  season and ripened on the tree are far higher in essential
                  nutrients than those grown in greenhouses and ripened by
                  laser. Knowledge of chronobiological patterns can have many
                  pragmatic implications for our day-to-day lives. While
                  contemporary living can sometimes appear to subjugate biology
                  - after all, who needs circadian rhythms when we have caffeine
                  pills, energy drinks, shift work and cities that never sleep?
                  - keeping in synch with our body clock is important. The
                  average urban resident, for example, rouses at the
                  eye-blearing time of 6.04 a.m., which researchers believe to
                  be far too early. One study found that even rising at 7.00
                  a.m. has deleterious effects on health unless exercise is
                  performed for 30 minutes afterward. The optimum moment has
                  been whittled down to 7.22 a.m.; muscle aches, headaches and
                  moodiness were reported to be lowest by participants in the
                  study who awoke then. Once you're up and ready to go, what
                  then? If you're trying to shed some extra pounds, dieticians
                  are adamant: never skip breakfast. This disorients your
                  circadian rhythm and puts your body in starvation mode. The
                  recommended course of action is to follow an intense workout
                  with a carbohydrate-rich breakfast; the other way round and
                  weight loss results are not as pronounced. Morning is also
                  great for breaking out the vitamins. Supplement absorption by
                  the body is not temporal-dependent, but naturopath Pam Stone
                  notes that the extra boost at breakfast helps us get energised
                  for the day ahead. For improved absorption, Stone suggests
                  pairing supplements with a food in which they are soluble and
                  steering clear of caffeinated beverages. Finally, Stone warns
                  to take care with storage; high potency is best for
                  absorption, and warmth and humidity are known to deplete the
                  potency of a supplement. After-dinner espressos are becoming
                  more of a tradition - we have the Italians to thank for that -
                  but to prepare for a good night's sleep we are better off
                  putting the brakes on caffeine consumption as early as 3 p.m.
                  With a seven-hour half-life, a cup of coffee containing 90 mg
                  of caffeine taken at this hour could still leave 45 mg of
                  caffeine in your nervous system at ten o'clock that evening.
                  It is essential that, by the time you are ready to sleep, your
                  body is rid of all traces. Evenings are important for winding
                  down before sleep; however, dietician Geraldine Georgiou warns
                  that an after-five carbohydrate-fast is more cultural myth
                  than chronobiological demand. This will deprive your body of
                  vital energy needs. Overloading your gut could lead to
                  indigestion, though. Our digestive tracts do not shut down for
                  the night entirely, but their work slows to a crawl as our
                  bodies prepare for sleep. Consuming a modest snack should be
                  entirely sufficient.`}
                </p>
                <p className="mt-8 mb-3">
                  <b>Read Passage and Match The Following</b>
                </p>
                <div className="mb-2">
                  <h4 className="text-sm">
                    1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                  </h4>
                  <input
                    type="text"
                    placeholder=""
                    className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400 focus:outline-none px-2"
                  />
                </div>
                <div className="mb-2">
                  <h4 className="text-sm">
                    2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                  </h4>
                  <input
                    type="text"
                    placeholder=""
                    className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400  focus:outline-none px-2"
                  />
                </div>
                <div className="mb-2">
                  <h4 className="text-sm">
                    3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                  </h4>
                  <input
                    type="text"
                    placeholder=""
                    className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400  focus:outline-none px-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Reading;
