import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";
export default function Home() {

  return (
    <>

      <section>
        <h1 className="text-center" >The hub of every Dev <br /> Event you cant miss</h1>
        <p className="text-center mt-5">Hackathons, Meetups and Conferences, All in one place</p>
        <ExploreBtn />

        <div className="mt-20 space-y-7">
          <h3>Fetaure Events</h3>

          <div className="events">
            {events.map((event, key)=>(
              <EventCard key={key} {...event}/>
            ))}
 
          </div>
         
          
        </div>
      </section>
    </>
  )
}