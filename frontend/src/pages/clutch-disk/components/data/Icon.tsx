// Impor gambar dari folder assets
import buildIcon from "../../../../assets/icon01.svg";
import chuteIcon from "../../../../assets/icon02.svg";
import dollyConveyanceIcon from "../../../../assets/icon03.svg";
import intructionIcon from "../../../../assets/icon04.svg";
import kanbanPostIcon from "../../../../assets/icon05.svg";
import kanbanPost2Icon from "../../../../assets/icon06.svg";
import kanbanPost3Icon from "../../../../assets/icon07.svg";
import kanbanIcon from "../../../../assets/icon08.svg";
import otherIcon from "../../../../assets/icon09.svg";
import shipConveyanceIcon from "../../../../assets/icon10.svg";
import processIcon from "../../../../assets/icon11.svg";
import sequenceLaneIcon from "../../../../assets/icon12.svg";
import text8Icon from "../../../../assets/icon13.svg";
import storeIcon from "../../../../assets/icon14.svg";
import yamaIcon from "../../../../assets/icon15.svg";
import truckConveyanceIcon from "../../../../assets/icon16.svg";
import blackArrowIcon from "../../../../assets/icon17.svg";
import redArrowIcon from "../../../../assets/icon18.svg";
import destinationIcon from "../../../../assets/icon19.svg";
import addTextIcon from "../../../../assets/icon20.svg";

const listIcons = [
  {
    name: "Build",
    icon: <img src={buildIcon} alt="Build" className="w-12 h-12" />,
  },
  {
    name: "Chute",
    icon: <img src={chuteIcon} alt="Chute" className="w-12 h-12" />,
  },
  {
    name: "Dolly Conveyance",
    icon: (
      <img
        src={dollyConveyanceIcon}
        alt="Dolly Conveyance"
        className="w-12 h-12"
      />
    ),
  },
  {
    name: "Intruction",
    icon: <img src={intructionIcon} alt="Intruction" className="w-12 h-12" />,
  },
  {
    name: "Kanban Post",
    icon: <img src={kanbanPostIcon} alt="Kanban Post" className="w-12 h-12" />,
  },
  {
    name: "Kanban Post 2",
    icon: (
      <img src={kanbanPost2Icon} alt="Kanban Post 2" className="w-12 h-12" />
    ),
  },
  {
    name: "Kanban Post 3",
    icon: (
      <img src={kanbanPost3Icon} alt="Kanban Post 3" className="w-12 h-12" />
    ),
  },
  {
    name: "Kanban",
    icon: <img src={kanbanIcon} alt="Kanban" className="w-12 h-12" />,
  },
  {
    name: "Other",
    icon: <img src={otherIcon} alt="Other" className="w-12 h-12" />,
  },
  {
    name: "Ship Conveyance",
    icon: (
      <img
        src={shipConveyanceIcon}
        alt="Ship Conveyance"
        className="w-12 h-12"
      />
    ),
  },
  {
    name: "Process",
    icon: <img src={processIcon} alt="Process" className="w-12 h-12" />,
  },
  {
    name: "Sequence Lane",
    icon: (
      <img src={sequenceLaneIcon} alt="Sequence Lane" className="w-12 h-12" />
    ),
  },
  {
    name: "Text 8",
    icon: <img src={text8Icon} alt="Text 8" className="w-12 h-12" />,
  },
  {
    name: "Store",
    icon: <img src={storeIcon} alt="Store" className="w-12 h-12" />,
  },
  {
    name: "Yama",
    icon: <img src={yamaIcon} alt="Yama" className="w-12 h-12" />,
  },
  {
    name: "Truck Conveyance",
    icon: (
      <img
        src={truckConveyanceIcon}
        alt="Truck Conveyance"
        className="w-12 h-12"
      />
    ),
  },
  {
    name: "Black Arrow",
    icon: <img src={blackArrowIcon} alt="Black Arrow" className="w-12 h-12" />,
  },
  {
    name: "Red Arrow",
    icon: <img src={redArrowIcon} alt="Red Arrow" className="w-12 h-12" />,
  },
  {
    name: "Destination",
    icon: <img src={destinationIcon} alt="Destination" className="w-12 h-12" />,
  },
  {
    name: "Add Text",
    icon: <img src={addTextIcon} alt="Add Text" className="w-12 h-12" />,
  },
];

export default listIcons;
