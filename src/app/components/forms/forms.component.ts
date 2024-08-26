import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../../../model/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {

  formulario = new FormGroup({
    nome:new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null,[Validators.required, Validators.min(0), Validators.max(110)]),
    cidade: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });

  btnCadastrar:boolean = true;

  /* Armazenar indice */
  indice: number = - 1;

  //Vetor
  lista: Pessoa[] = []

  cadastrar(){
    this.lista.push(this.formulario.value as Pessoa)

    this.formulario.reset();
    console.table(this.lista)
  }

  selecionar(indice: number){
    this.indice = indice
    this.formulario.setValue({
      nome: this.lista[indice].nome,
      idade: this.lista[indice].idade,
      cidade: this.lista[indice].cidade,
    });

    this.btnCadastrar = false
  }

  alterar(){
    this.lista[this.indice] = this.formulario.value as Pessoa

    this.formulario.reset();

    this.btnCadastrar = true
  }

  deleta(){
    this.lista.splice(this.indice, 1)
    this.formulario.reset();
    this.btnCadastrar = true
  }

  cancelar(){
    this.formulario.reset()
    this.btnCadastrar = true
  }
}
