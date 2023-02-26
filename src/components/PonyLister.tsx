import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import { relative } from 'path';
import React, { ChangeEvent, ChangeEventHandler, HtmlHTMLAttributes, HTMLInputTypeAttribute, MouseEventHandler, useState } from 'react';
import { IndexKind } from 'typescript';
type PonyListerState = {
    _currentPonyName: string,
    _currentPonyKind: Kind,
    _ponyList: Pony[]
}

type Pony =
{
    name: string,
    kind: Kind
}

type Kind = "Earth" | "Unicorn" | "Pegasus"  

export class PonyLister extends React.Component<{},PonyListerState>
{  
    constructor(props: {})
    {
        super(props)

        const AppleJack: Pony = {
            name: "Applejack",
            kind: "Earth"
        }
    
        const Rarity: Pony = {
            name: "Rarity",
            kind: "Unicorn"
        }

        this.state = {
            _currentPonyName: "",
            _currentPonyKind: "Earth",
            _ponyList: [   
                AppleJack,
                Rarity]
        }
    }

    render()
    {
        return (
            <div>
                {this.CreateInputField("Pony Name", 
                    "Pony Name: ", editableInputTypes.text,
                    this.UpdateCurrentPonyName)}
                <p>
                    Pony Kind: {
                    this.CreateDropdown(
                        ["Earth", "Unicorn", "Pegasus"], 
                        this.UpdateCurrentPonyKind)}
                </p>
                    
                <button onClick={this.AddToList}>Add Pony</button>
                {this.CreatePonyList()}
            </div>
        );
    }

    UpdateCurrentPonyName = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (event.currentTarget.value != null)
        {
            const newPonyName = event.currentTarget.value;

            this.setState(
                {_currentPonyName: newPonyName}
            )
        }
    }

    UpdateCurrentPonyKind = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (event.currentTarget.value != null)
        {
            const newPonyKind = event.currentTarget.value as Kind;

            this.setState(
                {_currentPonyKind: newPonyKind}
            )
        }
    }

    CreateDropdown(options: string[], funcOnChange: ChangeEventHandler)
    {
        function createOption()
        {
            return (
                options.map((name, index) => 
                {
                    return (
                        <option key={"option: " + name + " "+ index} 
                            value={name}> {name}
                        </option>
                    )
                })
            )
        }

        return(
            <label htmlFor="">
                <select onChange={funcOnChange}
                    name="" id=""> {createOption()}
                </select>
            </label>
        )
    }

    AddToList = () =>
    {
        const newPony: Pony = {
            name: this.state._currentPonyName,
            kind: this.state._currentPonyKind
        }

        const newPonyList: Pony[] = this.state._ponyList;
        console.log(newPony.name, newPony.kind);
        newPonyList.push(newPony);

        this.setState(
            {_ponyList: newPonyList}
        )
    };

    RemovePonyFromList(ponyToRemove: Pony)
    {
        this.setState(
            {
                // Removes pony ponyToRemove object from pony list.
                _ponyList: this.state._ponyList.filter((pony) => 
                {return pony !== ponyToRemove})
            }
        )
    }

    CreatePonyList()
    {
        return (
            this.state._ponyList.map((pony,index) => {
                return (
                    <p                         
                        key={pony.name + " " + index}>
                        
                        <img 
                            width="50px"
                            src="/home-page/default-image.jpg" 
                            alt="Profile Pic"/>
                        {pony.name}: {pony.kind}
                        <button 
                            // Putting () => fixes this, so silly
                            // Because cannot return void, create new func.
                            onClick={() => this.RemovePonyFromList(
                                this.state._ponyList[index])} 
                            style={{position: "relative", left: 20, 
                                height: 20}}>Remove
                        </button>
                    </p>
                )
            })
        )
    }

    CreateInputField(name: string, labelText: string, 
        inputType: HTMLInputTypeAttribute, 
        funcOnChange: ChangeEventHandler, 
        placeHolderText: string = "")
    {
        return(
            <div className={name + " Input Container"}>
                <label htmlFor={name}>{labelText}</label>
                
                <input onChange={funcOnChange} 
                    type={inputType} name={name} 
                    placeholder={placeHolderText}/>
            </div>
        );
    }
}