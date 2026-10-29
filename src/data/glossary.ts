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
quarter=cuarto;half=media, mitad;o'clock=en punto;meeting=reunión;appointment=cita;agenda=agenda;emails=correos;message=mensaje;report=informe;manager=gerente;receptionist=recepcionista;
designer=diseñador;cleaner=conserje;director=director, directora;company=empresa;busy=ocupado;free=libre;spring=primavera;summer=verano;autumn=otoño;winter=invierno;evening=noche (temprano);
could=podría, podrías (can);sure=claro;course=curso (of course = por supuesto);repeat=repetir;slowly=despacio;spell=deletrear;send=enviar;answer=contestar;ring=sonar (teléfono);book=libro, reservar;
hurry=apurarse;rude=grosero;drawer=cajón;card=tarjeta;job=trabajo;lunch=almuerzo;floor=piso;watch=reloj (de pulsera), mirar;crazy=loco;hands=manos, agujas (del reloj);past=pasado, y (half past = y media);
future=futuro;team=equipo;secretary=secretaria;stay=quedarse;hang=colgar;note=nota;
bird=pájaro;hamster=hámster;sunny=soleado;rainy=lluvioso;cloudy=nublado;windy=con viento;snow=nieve;tail=cola;ears=orejas;ear=oreja;nose=nariz;mouth=boca;legs=piernas, patas;whose=de quién;hers=suyo (de ella);his=su, suyo (de él);mine=mío;yours=tuyo;
was=era, estaba, fue (to be);were=eran, estaban, fueron (to be);wasn't=no era, no estaba;weren't=no eran, no estaban;principal=director (de escuela);attendance=asistencia;ago=hace (tiempo);last=pasado, último (last week = la semana pasada);vest=chaleco;nervous=nervioso;shy=tímido;bell=campana;brick=ladrillo;dirt=tierra;pocket=bolsillo;dear=querido;gone=ido (he was gone = ya no estaba);
walked=caminé, caminó (walk);played=jugué, jugó (play);wanted=quise, quería (want);needed=necesité, necesitaba (need);visited=visité (visit);waited=esperé (wait);painted=pinté (paint);cooked=cociné (cook);washed=lavé (wash);watched=miré, vi (watch);stopped=paré, se detuvo (stop);opened=abrí, abrió (open);closed=cerré, cerró (close);called=llamé (call);lived=viví, vivía (live);helped=ayudé, ayudó (help);studied=estudié (study);tried=intenté (try);carried=cargué (carry);delivered=entregué, entregó (deliver);posted=envié por correo (post);shouted=grité, gritó (shout);picked=recogí, recogió (pick up);landed=cayó, aterrizó (land);changed=cambié, cambió (change);laughed=me reí (laugh);rained=llovió (rain);listened=escuché (listen);cleaned=limpié, limpió (clean);dropped=dejé caer (drop);looked=se veía, miré (look);thanked=agradeció (thank);smiled=sonrió (smile);talked=habló (talk);sorted=ordené (sort);fixed=arreglé (fix);deliver=entregar;delivery=entrega, reparto;mail=correo;mailbag=bolsa de cartas;carrier=portador (mail carrier = cartero);stamp=estampilla;letters=cartas;well=bien, pozo;cart=carreta;stall=puesto (de mercado);stalls=puestos;sack=saco;sacks=sacos;apron=delantal;dirt=tierra (dirt road = carretera destapada);box=caja, cabina (phone box);boxes=cajas;kilometers=kilómetros;silent=callado, en silencio;building=construyendo, edificio;popular=popular;syllable=sílaba;
went=fui, fue (go);got=conseguí, llegué (get);had=tuve, tenía (have);ate=comí, comió (eat);drank=bebí (drink);made=hice, hizo (make);built=construí, construyó (build);brought=traje, trajo (bring);bought=compré, compró (buy);came=vine, vino (come);ran=corrí (run);sat=me senté (sit);slept=dormí (sleep);took=tomé, llevé (take);said=dije, dijo (say);told=conté, dije (tell);knew=sabía, conocía (know);thought=pensé (think);wrote=escribí, escribió (write);saw=vi, vio (see);found=encontré (find);gave=di, dio (give);did=hice, hizo (do);met=conocí, se conocieron (meet);became=se volvió (become);fell=cayó (fall);left=se fue (leave);won=gané (win);cried=lloró (cry);touched=tocó (touch);learned=aprendí (learn);goed=(error: se dice went);buyed=(error: se dice bought);eated=(error: se dice ate);builder=albañil, constructor;painter=pintor, pintora;helmet=casco;scaffolding=andamio;sand=arena;mixer=mezcladora;bricks=ladrillos;brick=ladrillo;hut=caseta;bucket=balde;handsome=guapo;university=universidad;cookies=galletas;windmill=molino;rebels=rebeldes;verb=verbo;verbs=verbos;page=página;pages=páginas;
more=más;become=volverse, convertirse;market=mercado;many=muchos;kids=niños;kid=niño;son=hijo;so=tan, así que;add=agregar;never=nunca;boss=jefe;radio=radio;make=hacer;if=si (condición);running=corriendo;same=mismo;something=algo;long=largo (a long time = mucho tiempo);balloon=globo;sound=sonido;only=solo, solamente;hour=hora;hundred=cien;maybe=tal vez;just=solo, apenas;end=final;better=mejor;important=importante;change=cambiar;strict=estricto;happen=pasar, suceder;correctly=correctamente;into=dentro de, a;show=mostrar;sentence=oración, frase;gamer=jugador (de videojuegos);controller=control (de videojuego);most=más (the most = el más);simple=simple;start=empezar;disaster=desastre;yet=todavía;month=mes;plaza=plaza;away=lejos;town=pueblo;out=fuera (watch out = ¡cuidado!);lose=perder;fragment=fragmento;someone=alguien;worry=preocuparse;star=estrella;correct=correcto, corregir;bowl=tazón;empty=vacío;polite=amable, cortés;double=doble, doblar;around=alrededor;forget=olvidar;part=parte;tell=decir, contar;short=corto, bajo;hear=oír;luck=suerte;worker=trabajador, obrero;full=lleno;practice=practicar;anytime=cuando quieras;mistake=error;list=lista;soon=pronto;whole=entero, todo;light=luz, ligero;sitting=sentado;site=lugar (building site = obra);paint=pintura, pintar;fix=arreglar;king=rey;different=diferente;hard=duro, difícil;kidding=bromeando;seller=vendedor;treasure=tesoro;neighborhood=barrio;carry=cargar, llevar;address=dirección;addresses=direcciones;pick=recoger (pick up);truth=verdad;irregular=irregular;fresh=fresco;rice=arroz;will=(futuro) va a;interesting=interesante;apostrophe=apóstrofo;everywhere=por todas partes;top=parte de arriba;below=debajo;beside=al lado de;point=punto, señalar;secret=secreto;consonant=consonante;vowel=vocal;routine=rutina;able=capaz;pet=mascota;present=presente, regalo;plural=plural;body=cuerpo;season=estación (del año);permission=permiso;plus=más;finish=terminar;picture=dibujo, foto;visit=visitar;police=policía;medical=médico, de medicina;stand=estar de pie;stood=estuvo de pie (stand);reception=recepción;sense=sentido;quick=rápido;eleven=once;swimming=nadando, natación;pool=piscina;salad=ensalada;beach=playa;sick=enfermo;yard=patio;mailbox=buzón;across=al otro lado de;idea=idea;rest=descansar;leave=irse, dejar;enemy=enemigo;loud=fuerte, ruidoso;funniest=el más divertido;smartest=el más inteligente;jealous=celoso;soup=sopa;huge=enorme;champion=campeón;champions=campeones;throw=lanzar;faster=más rápido;salt=sal;taxi=taxi;lab=laboratorio;trainer=entrenador;mode=modo;sparring=de práctica;partner=compañero;greetings=saludos;introductions=presentaciones;learner=estudiante;laugh=reír;laughing=riéndose;loyal=leal;patio=patio;registered=inscrito;assistant=asistente;slow=lento;dirty=sucio;both=ambos;bright=brillante;brighter=más brillante;move=mover;moving=moviéndose;shout=gritar;special=especial;seed=semilla (el pasado de see es saw);
studyed=(error: se dice studied);stoped=(error: se dice stopped);tryed=(error: se dice tried);plaied=(error: se dice played);helpped=(error: se dice helped);deliverred=(error: se dice delivered);walkd=(error: se dice walked);talkd=(error: se dice talked);walkt=(error: se escribe walked);playd=(error: se escribe played);openned=(error: se dice opened);carryed=(error: se dice carried);liveed=(error: se dice lived);visitted=(error: se dice visited);stopt=(error: se escribe stopped);comed=(error: se dice came);writed=(error: se dice wrote);finded=(error: se dice found);founded=(error: se dice found);falled=(error: se dice fell);taked=(error: se dice took);sayed=(error: se dice said);gived=(error: se dice gave);knowed=(error: se dice knew);maked=(error: se dice made);putted=(error: se dice put);builded=(error: se dice built);telled=(error: se dice told);meeted=(error: se dice met);sitted=(error: se dice sat);runned=(error: se dice ran);thinked=(error: se dice thought);getted=(error: se dice got);haved=(error: se dice had);drinked=(error: se dice drank);sleeped=(error: se dice slept);bringed=(error: se dice brought);doed=(error: se dice did);readed=(error: se dice read);ated=(error: se dice ate);wented=(error: se dice went);
rope=cuerda;anybody=alguien, nadie (en preguntas y negaciones);scared=asustado;way=camino, manera;steal=robar;detective=detective;puppy=cachorro;broke=rompí, rompió (break);break=romper;blanket=cobija;invite=invitar;understood=entendí (understand);understand=entender;really=de verdad;still=todavía;pretty=bonito;sweet=tierno, dulce;movie=película;problem=problema;grandchildren=nietos;cinema=cine;almost=casi;try=intentar;vet=veterinario;feed=alimentar;hen=gallina;teeth=dientes;marks=marcas;sound=sonido;nobody=nadie;
film=película;films=películas;sold=vendí, vendió (sell);sell=vender;popcorn=palomitas;projector=proyector;projectionist=proyeccionista;seat=butaca, asiento;seats=butacas;daughter=hija;date=fecha;dates=fechas;ticket=boleta, boleto;screen=pantalla;poster=afiche;director=director, directora;full=lleno;row=fila;forget=olvidar;happened=pasó, sucedió (happen);further=más lejos;
robot=robot;astronaut=astronauta;tonight=esta noche;glass=vidrio, vaso;lesson=lección, clase;cancel=cancelar;sensor=sensor;video=video (video games = videojuegos);tenth=décimo;fifteenth=decimoquinto;somebody=alguien;detected=detectado;famous=famoso;promise=prometer, promesa;forever=para siempre;computer=computadora;camera=cámara;silver=plateado, plata;ever=alguna vez;familiar=conocido, familiar;moon=luna;mars=Marte;drone=dron;future=futuro;plan=plan;wonderful=maravilloso;going=yendo (going to = ir a, para planes);smart=inteligente (smart board = pizarra digital);uniform=uniforme;
holo=holográfico;fit=quedar bien (ropa);mayor=alcalde;post=enviar por correo;drove=manejé, manejó (drive);forty=cuarenta;enter=entrar;retire=jubilarse, retirarse;anywhere=a ninguna parte, a cualquier parte;chief=jefe, jefa;serve=atender, servir;proud=orgulloso;hope=esperar (tener esperanza);own=propio;statue=estatua;pay=pagar;free=gratis, libre;tourist=turista;tourists=turistas;guide=guía;sky=cielo;fly=volar;
person=persona;growing=creciendo (grow);grow=crecer;toy=juguete;woke=desperté (wake up);waked=(error: se dice woke);wife=esposa;throat=garganta;magic=mágico;amazing=increíble;eighty=ochenta;grandson=nieto;speech=discurso;wear=usar, llevar puesto;hat=sombrero;single=cada, solo;sixty=sesenta;neighbors=vecinos;street=calle;basketball=baloncesto;guitar=guitarra;
i'm=yo soy, yo estoy;you're=tú eres, tú estás;he's=él es, él está;she's=ella es, ella está;it's=es, está;we're=nosotros somos;they're=ellos son;that's=eso es;let's=vamos a;what's=qué es;
don't=no (no hagas);doesn't=no (con he/she/it);didn't=no (en pasado);won't=no va a;can't=no puede;haven't=no tiene (have got);hasn't=no tiene (has got);got=(have got = tener)
clouds=nubes;cloud=nube;tractor=tractor;roof=techo;solar=solar;wind=viento;turbine=turbina (wind turbine = molino eólico);lick=lamer;ninety=noventa;porch=porche;warm=cálido, tibio;exactly=exactamente;tower=torre;chick=pollito;battery=batería;drone=dron;forever=para siempre;together=juntos;loud=ruidoso, fuerte;begin=empezar;end=terminar, final;happen=pasar, suceder;
opposite=enfrente de;flowers=flores;born=nacer (are born = nacen);other=otro;side=lado;
weekend=fin de semana;lobby=recepción, vestíbulo;memory=memoria;politely=con cortesía;panels=paneles;
want=querer;wants=quiere;wanted=quería, quise (want);would=(would like = me gustaría);like=gustar, como;elevator=ascensor;speech=discurso;director=director, directora;retire=jubilarse;retired=jubilado;goodbye=adiós;floors=pisos;floor=piso;tower=torre;suit=traje;chair=silla;habits=costumbres;whoever=quienquiera que;especially=especialmente;nervous=nervioso;popcorn=palomitas;
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
