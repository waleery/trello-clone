import { StateCreator, create } from "zustand";

// Define the interface describing the shape of the store state.
interface CardModalStore {
    id?: string;
    isOpen: boolean;  
    onOpen: (id: string) => void;
    onClose: () => void;  
}


// Define a StateCreator function to create the initial store state.

// : StateCreator<MobileSidebarStore>: Specifies the type of this constant. 
// The StateCreator type is a kind of function that creates and manages the application state. 
// <MobileSidebarStore> is the type of state that this function will create.

const store: StateCreator<CardModalStore> = (set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined}),
});


// Create an instance of the store using the create function.
export const useCardModal = create<CardModalStore>()(store);


//https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md

// In general, empty parentheses are used for immediately invoking the create
// <MobileSidebarStore>() function. This works because create<MobileSidebarStore> 
// returns a function, and we immediately invoke it with empty parentheses to obtain 
// a ready instance of the store. This ensures that types are correctly set for 
// both the store and its state.

