#!/usr/bin/env node
import inquirer from "inquirer";
// Bank account interface
interface BankAccount {
    accountNumber : number;
    balance : number;
    withdraw (amount : number) : void;
    deposit (amount : number) : void;
    cheakBalance() : void;
}
//bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number,balance: number){
        this.accountNumber = accountNumber ,this.balance = balance
    }
    //debit money
    withdraw(amount : number) : void {
        if(this.balance >= amount){
        this.balance  -= amount 
            console.log(`withdrawal of $${amount}successful. Remaining Balance :$${this.balance}`);
        }
        else{
            console.log("insufficent balance:");
        }
    }

    //credit money
    deposit(amount: number) : void {
        if( amount > 100){
            amount  -= 1 
        } this.balance += amount 
        console.log(`Deposit of $${amount}successfull. remaining balance:$${this.balance}`);

    }
    cheakBalance(): void {
        console.log(`currentbalance: $${this.balance}`);
    }
}
class Customer{
firstName : string;
lastName : string;
gender : string;
age : number;
mobileNumber : number;
account : BankAccount;
constructor(firstName : string, lastName : string,gender:string,age:number,mobileNumber:number,account:BankAccount)
{
    this.firstName = firstName
    this.lastName = lastName
    this.gender = gender
    this.age = age
    this.mobileNumber =mobileNumber
    this.account = account
}
}

const accounts : BankAccount[]=[
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
const customers : Customer[]=[
    new Customer ("Raza","Ali","Male",32,3162223334,accounts[0]),
    new Customer ("Sana","khan","female",26,3151123334,accounts[1]),
    new Customer ("usman","memon","Male",24,3161223389,accounts[2])
]
//function
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name : "accountNumber",
            type : "number",
            message : "Enter your account number:"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if(customer){
            console.log(`welcome, ${customer.firstName}${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name : "select",
                type : "list",
                message : "select an operation",
                choices : ["Deposit","Withdraw","Cheakbalance","Exit"]
            }]);
switch(ans.select){
    case "Deposit":
        const depositAmount = await inquirer.prompt({
            name : "amount",
            type : "number",
            message : "enter the amount to deposit:"
        })
        customer.account.deposit(depositAmount.amount);
        break;
        case "Withdraw":
        const withdrawAmount = await inquirer.prompt({
            name : "amount",
            type : "number",
            message : "enter the amount to withdraw:"
        })
        customer.account.withdraw(withdrawAmount.amount);
        break;
        case "Cheakbalance":
         customer.account.cheakBalance ();
        break;
        case "Exit":
            console.log("exiting bank program...");
            console.log("\n Tank you for using our bank service!");
            return;
}



        }
        else{
            console.log("Invalid account number. Please try again.");
        }
    }while(true)
}
service();