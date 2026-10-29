import { DICT } from './diary'

/**
 * Diccionario inglés → español del juego (nivel A1), para tocar una palabra y ver qué significa.
 * Formato: palabra=traducción, separadas por punto y coma. Para agregar una palabra, añádela aquí.
 */
const RAW = `
a=un, una;about=sobre, acerca de;after=después de;afternoon=tarde;again=otra vez;age=edad;all=todo, todos;also=también;always=siempre;am=soy, estoy (to be);
american=estadounidense;an=un, una;and=y;angry=enojado;animal=animal;animals=animales;another=otro;answer=respuesta, responder;any=algún, nada de (en preguntas y negativas);
anything=algo, nada;apple=manzana;are=son, están (to be);aren't=no son, no están;arm=brazo;art=arte;ask=preguntar;at=en, a;bad=malo;bag=mochila, bolso;ball=pelota;
banana=banano;bank=banco;basketball=baloncesto;bathroom=baño;be=ser, estar;beautiful=hermoso;because=porque;bed=cama;before=antes de;behind=detrás de;bench=banca;best=mejor;
between=entre;big=grande;bike=bicicleta;birthday=cumpleaños;black=negro;blue=azul;board=pizarra;book=libro;bookshelf=estantería;boring=aburrido;bottle=botella;box=caja;boy=niño, chico;
brave=valiente;bread=pan;breakfast=desayuno;bring=traer;brother=hermano;brown=café, marrón;bus=autobús;but=pero;buy=comprar;bye=adiós;cabinet=archivador;cafeteria=cafetería;café=café (lugar);
cake=pastel;call=llamar;can=poder, puede;can't=no puede, no puedo;cap=gorra;captain=capitán;car=carro;careful=cuidadoso (be careful = ten cuidado);cat=gato;chair=silla;chalk=tiza;cheap=barato;
chess=ajedrez;chicken=pollo, gallina;child=niño;children=niños;city=ciudad;class=clase;classmate=compañero de clase;classroom=salón de clase;clean=limpio, limpiar;clock=reloj;close=cerrar;clothes=ropa;
coach=entrenador;coat=abrigo;coffee=café (bebida);cold=frío;color=color;come=venir;cook=cocinar;cookie=galleta;cool=genial;counter=mostrador;country=país;court=cancha;cousin=primo;cream=crema;
cross=cruzar;crosswalk=cebra, paso peatonal;cup=vaso, taza;dad=papá;dark=oscuro;day=día;dear=querido;delicious=delicioso;desk=pupitre, escritorio;diary=diario;did=hizo (pasado de do);
difficult=difícil;dinner=cena;do=hacer;does=hace (do, con he/she/it);dog=perro;dollar=dólar;don't=no (en órdenes: no hagas);door=puerta;down=abajo (sit down = siéntate);dress=vestido;drink=beber, bebida;
easy=fácil;eat=comer;egg=huevo;eight=ocho;email=correo electrónico;english=inglés;every=cada, todos los;everyone=todos;excuse=disculpar (excuse me = disculpe);expensive=caro;eye=ojo;eyes=ojos;
family=familia;far=lejos;farm=granja;fast=rápido;father=padre;favorite=favorito;fifteen=quince;fifty=cincuenta;find=encontrar;fine=bien;first=primero;fish=pez, pescado;five=cinco;floor=piso;
food=comida;football=fútbol;for=para, por;fountain=fuente;four=cuatro;friday=viernes;friend=amigo;from=de, desde;front=frente (in front of = delante de);fun=divertido;funny=gracioso;game=juego;
girl=niña, chica;give=dar;go=ir;goal=portería, meta;good=bueno;goodbye=adiós;great=genial;green=verde;guide=guía;hair=pelo;hand=mano;happy=feliz;has=tiene (have, con he/she/it);have=tener;
he=él;head=cabeza;hello=hola;help=ayudar;her=su (de ella), la;here=aquí;hi=hola;his=su (de él);history=historia;home=casa, hogar;homework=tarea;hospital=hospital;hot=caliente;house=casa;
how=cómo;hungry=con hambre;i=yo;ice=hielo (ice cream = helado);in=en, dentro de;is=es, está (to be);isn't=no es, no está;it=eso, lo;its=su (de una cosa);jacket=chaqueta;jeans=jeans;juice=jugo;
jump=saltar;key=llave;kind=amable;know=saber, conocer;late=tarde (llegar tarde);learn=aprender;left=izquierda;leg=pierna;library=biblioteca;like=gustar;listen=escuchar;little=pequeño;look=mirar;
lot=mucho (a lot of = muchos);love=amar, encantar;lunch=almuerzo;map=mapa;math=matemáticas;maths=matemáticas;me=me, a mí;meet=conocer (a alguien);milk=leche;mine=mío;mirror=espejo;money=dinero;
monday=lunes;morning=mañana;mother=madre;mom=mamá;much=mucho (how much = cuánto);music=música;my=mi;name=nombre;nationality=nacionalidad;near=cerca;need=necesitar;new=nuevo;next=siguiente (next to = al lado de);
nice=bonito, agradable;night=noche;no=no;not=no;notebook=cuaderno;now=ahora;number=número;of=de;office=oficina;officer=oficial, policía;ok=bien, de acuerdo;old=viejo (years old = años de edad);
on=en, sobre;one=uno;open=abrir, abierto;or=o;orange=naranja;order=pedido, ordenar;our=nuestro;over=allá (over there = por allá);page=página;paper=papel;park=parque;party=fiesta;pass=pasar;
pen=bolígrafo;pencil=lápiz;people=personas;perfect=perfecto;phone=teléfono;pink=rosado;pizza=pizza;place=lugar;plant=planta;play=jugar;player=jugador;please=por favor;price=precio;prize=premio;
question=pregunta;quiet=callado (be quiet = silencio);read=leer;ready=listo;red=rojo;right=derecha, correcto;road=calle, carretera;room=cuarto, salón;ruler=regla;run=correr;sad=triste;
sandwich=sándwich;saturday=sábado;say=decir;schedule=horario;school=escuela;science=ciencias;scissors=tijeras;secretary=secretaria;see=ver;seven=siete;she=ella;shirt=camisa;shoe=zapato;
shoes=zapatos;shop=tienda;sink=lavamanos;sister=hermana;sit=sentarse;six=seis;small=pequeño;smart=inteligente;soap=jabón;some=algunos, un poco de;sorry=perdón, lo siento;speak=hablar;sport=deporte;
stand=pararse (stand up = ponte de pie);stop=parar;straight=derecho (go straight = sigue derecho);strange=extraño;street=calle;strong=fuerte;student=estudiante;study=estudiar;subject=materia;
sunday=domingo;supermarket=supermercado;swim=nadar;table=mesa;take=tomar, llevar;talk=hablar;tall=alto;tea=té;teacher=profesor;team=equipo;ten=diez;tennis=tenis;test=examen;thank=agradecer (thank you = gracias);
thanks=gracias;that=ese, eso, aquel;the=el, la, los, las;their=su (de ellos);them=los, a ellos;then=luego;there=allí (there is = hay);these=estos;they=ellos;thing=cosa;think=pensar, creer;
thirteen=trece;thirty=treinta;this=este, esto;those=esos, aquellos;three=tres;thursday=jueves;ticket=boleto;time=tiempo, hora;tired=cansado;to=a, para;today=hoy;toilet=inodoro;tomorrow=mañana (el día siguiente);
too=también, demasiado;tourist=turista;towel=toalla;tree=árbol;tuesday=martes;turn=girar;twelve=doce;twenty=veinte;two=dos;under=debajo de;uniform=uniforme;up=arriba;us=nos, a nosotros;
very=muy;voice=voz;wait=esperar;waiter=mesero;wall=pared;want=querer;wash=lavar;water=agua;we=nosotros;wednesday=miércoles;welcome=bienvenido;wet=mojado;what=qué;when=cuándo;where=dónde;
whistle=silbato;white=blanco;who=quién;whose=de quién;why=por qué;window=ventana;with=con;word=palabra;words=palabras;work=trabajar, trabajo;write=escribir;year=año;years=años;yellow=amarillo;
yes=sí;yesterday=ayer;you=tú, usted, ustedes;young=joven;your=tu, su (de usted);yours=tuyo;
always=siempre;usually=normalmente;sometimes=a veces;often=a menudo;early=temprano;garden=jardín;gardening=jardinería;cook=cocinar;guitar=guitarra;piano=piano;neighbor=vecino;neighbors=vecinos;
ride=montar (ride a bike = montar en bici);fly=volar;grandpa=abuelo;grandma=abuela;grandparents=abuelos;parents=padres;baby=bebé;cry=llorar;sleep=dormir;drive=manejar;language=idioma;languages=idiomas;
doctor=médico;invitation=invitación;gift=regalo;may=mayo (también: poder);january=enero;february=febrero;march=marzo;april=abril;june=junio;july=julio;august=agosto;september=septiembre;
october=octubre;november=noviembre;december=diciembre;fifth=quinto;second=segundo;third=tercero;fourth=cuarto;hoodie=sudadera;sofa=sofá;fridge=nevera;kitchen=cocina;bedroom=cuarto, dormitorio;
living=vivir (living room = sala);sun=sol;shine=brillar;rain=llover, lluvia;weather=clima;umbrella=paraguas;report=reportaje, informe;news=noticias;noise=ruido;hobby=pasatiempo;energy=energía;
breaking=de última hora (breaking news);sing=cantar;song=canción;dance=bailar;draw=dibujar;watch=mirar, ver;tv=televisión;bike=bicicleta;everybody=todo el mundo;nobody=nadie;remember=recordar;
brave=valiente;hate=odiar;hurt=doler;minutes=minutos;wonderful=maravilloso;young=joven;photo=foto;photos=fotos;smile=sonreír;letter=letra, carta;strange=extraño;mean=significar;
fifteen=quince;enjoy=disfrutar;peruvian=peruano;everything=todo;alone=solo;floor=suelo, piso;nothing=nada;mine=mío;teach=enseñar;high=alto;walk=caminar;wait=esperar;waiting=esperando;
farmer=granjero;barn=granero;pen=corral;field=campo;pond=estanque;fence=cerca;hay=heno;wool=lana;wing=ala;wings=alas;grass=pasto;vet=veterinario;goose=ganso;geese=gansos;
mouse=ratón;mice=ratones;sheep=oveja, ovejas;pig=cerdo;duck=pato;rabbit=conejo;cow=vaca;horse=caballo;egg=huevo;eggs=huevos;foot=pie;feet=pies;tooth=diente;teeth=dientes;
man=hombre;men=hombres;woman=mujer;women=mujeres;leaf=hoja;leaves=hojas;meat=carne;corn=maíz;kilometers=kilómetros;believe=creer;catch=atrapar, cazar;milkshake=malteada;
milkshakes=malteadas;overalls=overol;granddaughter=nieta;glasses=gafas;metal=metal;shiny=brillante;sky=cielo;fall=caer;falls=cae (fall);count=contar;clearly=claramente;slowly=despacio;
quiet=callado, bajito;prefer=preferir;cheese=queso;box=caja;boxes=cajas;neigh=relincho;moo=muu;baa=bee;woof=guau;honk=graznido;questions=preguntas;sign=letrero;
i'm=yo soy, yo estoy;you're=tú eres, tú estás;he's=él es, él está;she's=ella es, ella está;it's=es, está;we're=nosotros somos;they're=ellos son;that's=eso es;let's=vamos a;what's=qué es;
don't=no (no hagas);doesn't=no (con he/she/it);didn't=no (en pasado);won't=no va a;can't=no puede;haven't=no tiene (have got);hasn't=no tiene (has got);got=(have got = tener)
`

const BASE: Record<string, string> = Object.fromEntries(
  RAW.split(';')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const i = p.indexOf('=')
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()]
    }),
)

/** Busca una palabra; si no está, prueba su forma base (plural, -ing, -ed) */
export function translate(raw: string): string | null {
  const w = raw.toLowerCase().replace(/[’`]/g, "'").replace(/^[^a-zà-ÿ']+|[^a-zà-ÿ']+$/g, '').replace(/^'+|'+$/g, '')
  if (!w) return null
  const direct = DICT[w] ?? BASE[w]
  if (direct) return direct
  const tries: [string, string][] = [
    [w.replace(/'s$/, ''), 'de'],
    [w.replace(/ies$/, 'y'), 'plural'],
    [w.replace(/es$/, ''), 'plural / con he, she, it'],
    [w.replace(/s$/, ''), 'plural / con he, she, it'],
    [w.replace(/ing$/, ''), 'forma -ing'],
    [w.replace(/ing$/, 'e'), 'forma -ing'],
    [w.replace(/ed$/, ''), 'pasado'],
    [w.replace(/ed$/, 'e'), 'pasado'],
  ]
  for (const [base, note] of tries) {
    if (base === w) continue
    const t = DICT[base] ?? BASE[base]
    if (t) return note === 'de' ? `de ${t}` : `${t} (${base}, ${note})`
  }
  return null
}

export function normalizeWord(raw: string) {
  return raw.toLowerCase().replace(/[’`]/g, "'").replace(/^[^a-zà-ÿ']+|[^a-zà-ÿ']+$/g, '').replace(/^'+|'+$/g, '')
}
