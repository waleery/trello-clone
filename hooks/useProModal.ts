import { StateCreator, create } from "zustand";

// Define the interface describing the shape of the store state.
interface ProModalStore {
    isOpen: boolean;  
    onOpen: () => void;
    onClose: () => void;  
}


// Define a StateCreator function to create the initial store state.

// : StateCreator<MobileSidebarStore>: Specifies the type of this constant. 
// The StateCreator type is a kind of function that creates and manages the application state. 
// <MobileSidebarStore> is the type of state that this function will create.

const store: StateCreator<ProModalStore> = (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
});


// Create an instance of the store using the create function.
export const useProModal = create<ProModalStore>()(store);


//https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md

// In general, empty parentheses are used for immediately invoking the create
// <MobileSidebarStore>() function. This works because create<MobileSidebarStore> 
// returns a function, and we immediately invoke it with empty parentheses to obtain 
// a ready instance of the store. This ensures that types are correctly set for 
// both the store and its state.

