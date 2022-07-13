import { eventDetails, eventLen, eventPos } from '@/utils/eventUtils';
import { IEvent } from '@/redux/reducers/eventReducer';

interface IAddEventTile {
  day: string;
  event: IEvent;
  onRemove: (event: IEvent) => void;
  temp: boolean;
}

function EventTile({ day, event, onRemove, temp = false }: IAddEventTile) {
  return (
    <div
      id={`${day}_${event.index}`}
      className="absolute left-0 w-11/12 schedule truncate"
      style={{ top: eventPos(event), height: eventLen(event) }}
    >
      {!temp && (
        <button
          className="absolute top-[-1px] right-[1px] scale-[0.5]"
          onClick={() => onRemove(event)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
      {eventDetails(event)}
    </div>
  );
}

export default EventTile;
