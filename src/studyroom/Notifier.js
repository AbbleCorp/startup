const StudyEvent = {
    System: 'system',
    Join: 'userJoin',
    End: 'endSession',
    Project: 'projectComplete',
    Encouragement: 'encouragement'
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from; //username
        this.type = type; //event type
        this.value = value; //message value if system issue?
    }
}

class EventNotifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('StudyBud', StudyEvent.System, {msg : 'connected'}));
        };
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('StudyBud', StudyEvent.System, { msg: 'disconnected' }));
        };
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
            };
        }

        broadcastEvent(from, type, value) {
            const event = new EventMessage(from, type, value);
            this.socket.send(JSON.stringify(event));
         }

         addHandler(handler) {
            this.handlers.push(handler);
         }

         removeHandler(handler) {
            this.handlers = this.handlers.filter(h => h !== handler);
         }

         receiveEvent(event) {
            this.events.push(event);
            this.events.forEach((e) => {
                this.handlers.forEach((handler) => {
                    handler(e);
                });
            });
         }
}

const Notifier = new EventNotifier();
export {StudyEvent, Notifier};
