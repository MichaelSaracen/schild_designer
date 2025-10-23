

export class CommandManager {
    constructor() {
        this._undoStack = [];
        this._redoStack = [];
    }

    executeCommand( cmd ) {
        cmd.execute();
        this._undoStack.push( cmd );
        this._redoStack = []
    }

    undo() {
        const cmd = this._undoStack.pop();
        if ( cmd ) {
            cmd.undo();
            this._redoStack.push( cmd );
        }
    }

    redo( ) {
        const cmd = this._redoStack.pop();
        if ( cmd ) {
            cmd.execute();
            this._undoStack.push( cmd );
        }
    }

}