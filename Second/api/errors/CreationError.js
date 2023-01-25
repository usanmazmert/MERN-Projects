export default class CreationError extends Error{
    constructor(message){
        super(message);
        this.status = 424;
    }
}