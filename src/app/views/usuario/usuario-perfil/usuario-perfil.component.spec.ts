import { UsuarioPerfilService } from './../../../services/usuario-perfil/usuario-perfil.service';
import { TestBed } from "@angular/core/testing";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpClient testing', () => {
  let httpMock: HttpTestingController;
  let usuarioService: UsuarioPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [UsuarioPerfilService]
    });

    usuarioService = TestBed.inject(UsuarioPerfilService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('ObterPerfil', () => {

    it('Should return an UsuarioPerfil', () => {

      const perfilUsuarios = {
        codigoUsuario: 2,
        nomeUsuario: "adolfo agora vai",
        nomeSetor: "SEM SETOR",
        razaoSocial: "SEM EMPRESA",
        descricaoPermissao: "Permissão básica",
        email: "adolfo8799@gmail.com",
        senha: "Alfabetazulu080799",
        imagemUrl: "registered222646147.png"
      }

      usuarioService.obterPerfilUsuario(1).subscribe((perfil) => {

      expect(perfil.codigoUsuario).toBe(2);
      expect(perfil).toEqual(perfilUsuarios);

      });

      const request = httpMock.expectOne(`${usuarioService.baseUrl}/1`);

      expect(request.request.method).toBe("GET");
      request.flush(perfilUsuarios);
      httpMock.verify();

    });
  });
});

