import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function PopoverButton({placeholder, title, subtitle}) {
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">{title}</Popover.Header>
          <Popover.Body>
            {subtitle}
          </Popover.Body>
        </Popover>
      );
    
    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
             <Button variant="outline-dark">{placeholder}</Button>
        </OverlayTrigger>
    );
}

export default PopoverButton;
