// import { DateValidator } from './../../shared/date/date.validator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogDeleteComponent } from './../../shared/dialog/dialog-delete/dialog-delete.component';
import { MessageService } from './../../shared/message/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


import { ProtocoloService } from '../protocolo.service';
import { Protocolo } from '../protocolo.model';

@Component({
  selector: 'app-protocolo-cadastro',
  templateUrl: './protocolo-cadastro.component.html',
  styleUrls: ['./protocolo-cadastro.component.css']
})
export class ProtocoloCadastroComponent implements OnInit {

  formulario: FormGroup;
  protocolos: Protocolo[];

  displayedColumns: string[] = ['id','oficio','origem', 'descricao','solicitante','criacao', 'action'];
  dataSource: MatTableDataSource<Protocolo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: ProtocoloService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const protocoloId = +this.route.snapshot.paramMap.get('id');
    this.listarDados();
    this.configurarFormulario();

    if (protocoloId) {
      this.atualizarFormulario(protocoloId);
    }
  }

  listarDados(): void {
    this.service.read().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.sortingDataAccessor();
    });
  }

  atualizarFormulario(id: number): void {
    this.service.readById(id).subscribe((data) => {
      this.formulario.patchValue(data);
    });
  }

  sortingDataAccessor(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      if ( property.includes('.') ) {
        return property.split('.').reduce((o, i) => o[i], item );
      }
      return item[property];
    };
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  configurarFormulario(): void  {
    this.formulario = this.formBuilder.group({
      id: [],
      // oficio: [null, [Validators.required]],
      origem: [null, [Validators.required]],
      descricao: [null, [Validators.required, Validators.minLength(6)]],
      solicitante: [null, [Validators.required]],
    });
  }

  get editando(): boolean {
    return Boolean(this.formulario.get('id').value);
  }


  salvar(): void {
    if (this.editando) {
      this.atualizarRegistro();
    } else {
      this.adicionarRegistro();
    }
  }

  atualizarRegistro(): void {
    this.service.update(this.formulario.value).subscribe(() => {
      this.messageService.showMessage('Plano atualizado com sucesso!');
       this.router.navigate(['/plano']);
       this.ngOnInit();
    });
  }

  adicionarRegistro(): void {
    this.service.create(this.formulario.value).subscribe(() => {
      this.messageService.showMessage('Protocolo criado com sucesso!');
      this.ngOnInit();
    });
  }

  openDialogExcluir(protocolo: Protocolo): void {
    const dialogRef = this.dialog.open( DialogDeleteComponent, {
      data: {
        titulo: 'Exclusão de Protocolo',
        descricao: `Tem certeza que deseja excluir o protocolo: ${ protocolo.oficio } ? `
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(protocolo.id).subscribe(() => {
          this.messageService.showMessage('Protocolo deletado com sucesso!');
          this.listarDados();
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/protocolo']);
  }

}
