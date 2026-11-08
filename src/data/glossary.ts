import { DICT } from './diary'

/**
 * Diccionario inglés → español del juego (niveles A1 y A2), para tocar una palabra y ver qué significa.
 * Formato: palabra=traducción, separadas por punto y coma. Para agregar una palabra, añádela aquí.
 */
const RAW = `
a=un, una;about=sobre, acerca de;after=después de;afternoon=tarde;again=otra vez;age=edad;all=todo, todos;also=también;always=siempre;am=soy, estoy (to be);
american=estadounidense;an=un, una;and=y;angry=enojado;animal=animal;animals=animales;another=otro;answer=respuesta, responder;any=algún, nada de (en preguntas y negativas);
anything=algo, nada;accepted=aceptado;above=encima de, arriba de;apart=aparte, por separado;aside=a un lado;bulb=bombillo;click=clic, hacer clic;clicks=hace clic;cover=tapa, cubrir;escape=escapar;escaped=escapó;exit=salida;gold=oro, dorado;golden=dorado;handle=manija;heater=calentador;heavy=pesado;internet=internet;kick=patear;lamp=lámpara;lever=palanca;lid=tapa;lift=levantar;lifting=levantando;network=red;passive=pasiva;plug=enchufe, enchufar;plugged=enchufado;pull=halar, tirar de;radiator=radiador;rock=roca;router=router (aparato del wifi);set=poner, configurar;slide=deslizarse;slides=se desliza;switch=interruptor, cambiar;towards=hacia;wifi=wifi;ancient=antiguo;bridge=puente;builds=construye;carved=tallado;force=fuerza;gap=abismo, hueco;glyphs=glifos;inscriptions=inscripciones;keeper=guardián;kept=guardado (keep);modal=modal (can, must…);temple=templo;apple=manzana;fade=desvanecerse;fades=se desvanece;glowing=brillando;grey=gris;residence=residencia;harbour=puerto (inglés británico);departure=salida (de un vuelo);arrival=llegada;delay=retraso, retrasar;luggage=equipaje;suitcase=maleta;boarding=embarque (boarding pass = pase de abordar);baggage=equipaje (baggage claim = zona de recogida de equipaje);downtown=centro (de la ciudad);package=paquete (package holiday = paquete turístico);sightseeing=turismo, visitar lugares;backpacking=viajar de mochilero;belt=cinta, correa (luggage belt = cinta de equipaje);explore=explorar;passport=pasaporte;pilot=piloto;property=propiedad (lost property = objetos perdidos);tag=etiqueta;gate=puerta de embarque (en el aeropuerto);sim=SIM (SIM card = tarjeta SIM);clerk=empleado, empleada (de un mostrador u oficina);anyone=alguien (en preguntas), nadie (en negativas);prepaid=prepago;contract=contrato;coverage=cobertura (de la señal);data=datos (data plan = plan de datos);unlimited=ilimitado;gigabyte=gigabyte (GB);bakery=panadería;claim=reclamar (baggage claim = zona de recogida de equipaje);decision=decisión;prediction=predicción;several=varios;allergic=alérgico;pleasant=agradable;planned=planeado (plan);unpacked=desempacado (unpack);are=son, están (to be);aren't=no son, no están;arm=brazo;art=arte;ask=preguntar;at=en, a;bad=malo;bag=mochila, bolso;ball=pelota;
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
fault=culpa;once=una vez (for once = por una vez);breathe=respirar;
wake=despertarse (wake up);snack=algo de comer, merienda;fruit=fruta;chocolate=chocolate (hot chocolate = chocolate caliente);arepa=arepa;extra=extra, de más;relaxed=tranquilo, relajado;
grammar=gramática;explain=explicar;serious=serio;club=club;common=común (in common = en común);cheek=mejilla;ugh=uf (queja);
opposite=enfrente de;flowers=flores;born=nacer (are born = nacen);other=otro;side=lado;
weekend=fin de semana;lobby=recepción, vestíbulo;memory=memoria;politely=con cortesía;panels=paneles;
want=querer;wants=quiere;wanted=quería, quise (want);would=(would like = me gustaría);like=gustar, como;elevator=ascensor;speech=discurso;director=director, directora;retire=jubilarse;retired=jubilado;goodbye=adiós;floors=pisos;floor=piso;tower=torre;suit=traje;chair=silla;habits=costumbres;whoever=quienquiera que;especially=especialmente;nervous=nervioso;popcorn=palomitas;
groups=grupos;group=grupo;tour=recorrido, visita guiada;outside=afuera;terrace=terraza;
advice=consejo;beginning=comienzo, principio;care=cuidado (take care = cuídate);carefully=con cuidado;center=centro;check=revisar;few=pocos (a few = unos pocos);fill=llenar (fill in = llenar un formulario);
hallway=pasillo;headache=dolor de cabeza;hey=oye, hola;hit=golpear, golpeó (hit, pasado igual);hitting=golpeando (hit);hitted=forma incorrecta (el pasado de hit es hit);hmm=mmm;item=objeto, artículo;male=masculino;female=femenino;
minion=esbirro;missing=perdido, que falta;must=deber, tener que;mustn't=no debes (está prohibido);nurse=enfermero, enfermera;oh=oh;pale=pálido;purple=morado;raise=levantar;round=ronda;
should=debería, deberías;shouldn't=no deberías;soda=gaseosa;sore=adolorido (sore throat = dolor de garganta);stairs=escaleras;which=cuál, que;worried=preocupado;wow=¡guau!;
backwards=hacia atrás;done=hecho, terminado;finally=por fin, finalmente;normal=normal;rule=regla;sometime=algún día, en algún momento;i'd=yo quisiera (I'd like = I would like);follow=seguir;climb=subir, trepar;
hale=Hale (nombre);instruction=instrucción;mind=importar (Would you mind...? = ¿Te importaría...?);off=apagado (turn off = apagar);request=petición;responsible=responsable;responsibility=responsabilidad;
safe=seguro, a salvo;screwdriver=destornillador;step=paso;tool=herramienta;toolbox=caja de herramientas;workbench=mesa de trabajo;workshop=taller;wrench=llave inglesa;glove=guante;hammer=martillo;ladder=escalera (de mano);cafe=café (lugar);hold=sostener, agarrar;shone=brilló (shine);disappear=desaparecer;
librarian=bibliotecario, bibliotecaria;bookmark=separador (de libro);borrow=pedir prestado;return=devolver, regresar;shelf=estante, repisa;belong=pertenecer;ink=tinta;testimony=testimonio, declaración;reader=lector, lectora;record=registro;visitor=visitante;heard=oyó, oí (hear);older=más viejo (old);bigger=más grande (big);than=que (para comparar);okafor=Okafor (nombre);mixed=mezclado (mixed up = revuelto);
access=acceso;accident=accidente;action=acción;activity=actividad;adjective=adjetivo;adventure=aventura;agree=estar de acuerdo;airport=aeropuerto;alert=alerta;allowed=permitido;
announcement=anuncio (por altavoz);anymore=ya no (not... anymore);anyway=de todos modos;appear=aparecer;argue=discutir;argument=discusión;arranged=organizado, acordado (arrange);asleep=dormido;
attention=atención;aunt=tía;avocado=aguacate;awake=despierto;badly=mal;bean=fríjol;beep=pitido;biggest=el más grande (big);blink=parpadear;block=bloquear, cuadra;blow=soplar;bossy=mandón, mandona;
butter=mantequilla;calm=calmado, tranquilo;calmer=más tranquilo (calm);candle=vela;cause=causa, causar;celebrate=celebrar;choice=opción, elección;choose=elegir;christmas=Navidad;church=iglesia;
chili=ají;cinnamon=canela;clear=claro, despejado;clue=pista;closer=más cerca (close);coin=moneda;colorful=colorido;comfortable=cómodo;compare=comparar;comparative=comparativo;completely=completamente;
confirm=confirmar;confused=confundido;congratulations=¡felicitaciones!;connect=conectar;continue=continuar;convince=convencer;cookbook=libro de cocina;coordination=coordinación;
coordinator=coordinador, coordinadora;corrupted=corrompido;correction=corrección;council=consejo (de la ciudad);crash=choque, chocar;create=crear;cupboard=alacena, armario;curly=crespo, rizado;
customer=cliente;dead=muerto;deal=trato;decide=decidir;decorate=decorar;deep=profundo;deeper=más profundo (deep);denied=negado, rechazado (deny);deny=negar;depot=depósito (de trenes o buses);
description=descripción;deserve=merecer;dessert=postre;dining=comer (dining room = comedor);direction=dirección;dish=plato;divide=dividir;dough=masa;driver=conductor, conductora;due=previsto, pendiente;
during=durante;dust=polvo;eater=el que come, comelón;edge=borde;else=más, otro (something else = otra cosa);entry=entrada, registro;even=incluso, hasta;event=evento;evidence=evidencia, pruebas;
exact=exacto;example=ejemplo;expect=esperar (que algo pase);experience=experiencia;expert=experto, experta;explode=explotar;face=cara;fact=hecho, dato;fair=justo;false=falso;fallen=caído (fall);
fear=miedo;fitting=prueba de ropa (fitting room = probador);flavor=sabor;flight=vuelo;form=forma, formulario;fork=tenedor;friendship=amistad;garage=garaje;ghost=fantasma;grant=conceder;
grandmother=abuela;grill=parrilla, asar a la parrilla;grilled=a la parrilla;guess=adivinar;guest=invitado, invitada;hall=pasillo, salón;health=salud;held=sostuvo (hold);helper=ayudante;
helpful=útil, servicial;hid=escondió (hide);hide=esconder, esconderse;hole=hueco, agujero;holiday=vacaciones, día festivo;honey=miel;hook=gancho;horseshoe=herradura;hunter=cazador, cazadora;
illness=enfermedad;imperative=imperativo;impossible=imposible;incomplete=incompleto;information=información;intention=intención;interrupt=interrumpir;itself=sí mismo, solo;jumper=suéter;
knife=cuchillo;knives=cuchillos (knife);knock=golpear, tocar (la puerta);lake=lago;land=aterrizar, tierra;lead=guiar, llevar;lemonade=limonada;lemon=limón;lie=mentira, mentir;life=vida;
line=fila, línea;loaf=pan entero (a loaf of bread);local=local, del lugar;lock=cerradura, cerrar con llave;log=registro;lovely=encantador, precioso;low=bajo;manners=modales;match=partido, combinar;
medicine=medicina, remedio;menu=menú;middle=medio, mitad;millstone=piedra de molino;minute=minuto;miss=extrañar, perder (el bus);mobility=movilidad;moment=momento;mountain=montaña;myself=yo mismo, me;
necessary=necesario;negative=negativo, frase negativa;noon=mediodía;nowhere=a ninguna parte;offer=ofrecer, oferta;oil=aceite;okay=está bien, de acuerdo;oldest=el más viejo (old);online=en línea;
operate=funcionar, operar;operator=operador, operadora;opinion=opinión;ouch=¡ay!;pack=empacar;paid=pagó, pagado (pay);pain=dolor;pair=par;participle=participio;passenger=pasajero, pasajera;
pasta=pasta;personality=personalidad;pile=pila, montón;pill=pastilla;planner=agenda, planificador;plantain=plátano (para cocinar);platform=andén;poor=pobre;port=puerto;positive=positivo, frase afirmativa;
possible=posible;postcard=postal;pot=olla;prepare=preparar;probably=probablemente;prove=demostrar;push=empujar;quantity=cantidad;queue=fila;quite=bastante;rack=estante, perchero;real=real, de verdad;
reason=razón;recalculate=recalcular;recent=reciente;recover=recuperarse;relationship=relación;relative=pariente;repairs=reparaciones;restore=restaurar;ridden=montado (ride);rode=montó (ride);
romantic=romántico;safely=sin peligro, a salvo;scare=asustar;scarf=bufanda;scarves=bufandas (scarf);sent=envió, enviado (send);service=servicio;shall=(para ofrecer o proponer) Shall we...? = ¿...?;
share=compartir;shelves=estantes (shelf);signal=señal;situation=situación;size=talla, tamaño;smaller=más pequeño (small);smell=oler, olor;sneakers=tenis (zapatos);snorkeling=buceo con snorkel;
sooner=más pronto (soon);speaker=parlante, hablante;spend=gastar, pasar (tiempo);spin=girar, dar vueltas;spinning=dando vueltas (spin);spoke=habló (speak);square=plaza, cuadrado;stable=establo;
station=estación;status=estado;stuck=atascado;suddenly=de repente;superlative=superlativo;surprise=sorpresa;sweater=suéter;symptom=síntoma;system=sistema;task=tarea;taste=sabor, probar;
teammate=compañero de equipo;tent=carpa;themselves=ellos mismos, se;tidied=ordenó, ordenado (tidy);tidy=ordenar, ordenado;tire=llanta;train=tren;transport=transporte;traveler=viajero, viajera;
trip=viaje;trouble=problema;turtle=tortuga;uncle=tío;unknown=desconocido;upstairs=arriba (en el piso de arriba);village=pueblo;warn=advertir;warning=advertencia;weak=débil;weaker=más débil (weak);
we've=nosotros hemos (we have);whatever=lo que sea;whisper=susurrar;winner=ganador, ganadora;wire=cable;world=mundo;yourself=tú mismo, te;you'll=tú vas a (you will);you've=tú has (you have);
battlefield=campo de batalla;harder=más difícil, más fuerte (hard);nineteen=diecinueve;obligation=obligación;sweeped=forma incorrecta: el pasado de sweep es swept;
he'll=él va a (he will);ding=din (sonido de campana);dong=don (sonido de campana);spain=España;peru=Perú;brazil=Brasil;canada=Canadá;japan=Japón;london=Londres;
air=aire;alarm=alarma (fire alarm = alarma de incendio);background=fondo;blurry=borroso;burn=quemar, arder;case=caso (in case of = en caso de);comma=coma;continuous=continuo;
cough=toser, tos;dry=seco;exhausted=agotado;fire=incendio, fuego (fire exit = salida de emergencia);firefighters=bomberos;firefighter=bombero;flames=llamas;forgot=olvidó (forget);grab=agarrar;
heat=calor;injured=herido;marker=marcador;mix=mezclar;noun=sustantivo;plane=avión;rang=sonó (ring);rescue=rescatar, rescate;result=resultado (as a result = como resultado);seen=visto (participio de see);
smoke=humo;starving=muerto de hambre;tense=tiempo verbal;tenses=tiempos verbales;thick=espeso, grueso;thicker=más espeso;trap=atrapar;trapped=atrapado;typing=escribiendo (en el teclado);
until=hasta;while=mientras;whoosh=fuum (sonido del fuego);
text=mensaje de texto, escribir un mensaje (text me = escríbeme);reply=responder, respuesta;ping=avisar con un mensaje rápido (ping me = avísame);dm=mensaje directo (DM, en redes sociales);vocal=vocal (vocal cords = cuerdas vocales);cords=cuerdas (vocal cords = cuerdas vocales);drop=soltar, dejar caer (drop me a line = mándame un mensaje);sounds=suena (sound) (sounds good = me parece bien);damaged=dañado;communicate=comunicarse;
receipt=recibo (read receipt = confirmación de lectura);stressed=estresado;overwhelmed=abrumado;anxious=ansioso;unwind=relajarse, desconectarse;inquiry=consulta, pregunta;certainly=claro, por supuesto;thumb=pulgar;thumbs=pulgares;buzz=vibrar, zumbar;buzzes=vibra (buzz);honoured=honrado (inglés británico);comprehended=comprendido (comprehend);delighted=encantado;conversations=conversaciones;duration=duración;period=período;casual=informal, casual;dots=puntos;
rent=alquiler, arriendo;deposit=depósito;landlord=dueño (el que arrienda);landlady=dueña (la que arrienda);tenant=inquilino;bills=cuentas, recibos (bills included = cuentas incluidas);included=incluido;rubbish=basura;forbidden=prohibido;stranger=desconocido, extraño;strangers=desconocidos;needn't=no necesitas, no es necesario;neighbour=vecino;neighbours=vecinos;prohibited=prohibido;similar=parecido, similar;complain=quejarse;midnight=medianoche;plate=plato;quietly=en voz baja, bajito;shower=ducha;account=cuenta (bank account = cuenta bancaria);corridor=pasillo;dream=sueño, soñar;dreams=sueños;noisy=ruidoso;proof=prueba, comprobante (proof of address = comprobante de domicilio);debit=débito (debit card = tarjeta de débito);pin=PIN, clave de la tarjeta;cash=efectivo (cash machine = cajero automático);machine=máquina;withdraw=retirar dinero;transfer=transferencia, transferir;statement=extracto bancario;document=documento;documents=documentos;id=identificación (student ID = carné de estudiante);object=objeto, complemento;pronoun=pronombre;rotate=girar, rotar;separable=separable;dish=plato;dishes=platos (wash the dishes = lavar los platos);section=sección, cláusula;falling=cayéndose (fall);easier=más fácil (easy);advert=anuncio (job advert = anuncio de empleo);adverts=anuncios;requirements=requisitos;requirement=requisito;apply=postularse, solicitar (un trabajo);unemployed=desempleado;fired=despedido;salary=salario, sueldo;deadline=fecha límite;cv=hoja de vida (CV);ad=anuncio;ads=anuncios;loan=préstamo;savings=ahorros;owe=deber (dinero);debt=deuda;debts=deudas;evict=desalojar;markers=marcadores;mug=taza, pocillo;notice=aviso, notificación (eviction notice = aviso de desalojo);eviction=desalojo;microphone=micrófono
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

/**
 * Phrasal verbs: verbo + partícula con un significado nuevo ("get up" = levantarse).
 * Al tocar el verbo o la partícula dentro de una frase, se muestra el phrasal verb completo.
 */
export const PHRASAL: Record<string, string> = {
  'get up': 'levantarse',
  'wake up': 'despertarse',
  'sit down': 'sentarse',
  'stand up': 'ponerse de pie',
  'get on': 'subirse a (bus, tren) · get on well = llevarse bien',
  'get off': 'bajarse de (bus, tren)',
  'get in': 'entrar, subirse (a un carro)',
  'get out': 'salir, bajarse (de un carro)',
  'turn on': 'encender, prender',
  'turn off': 'apagar',
  'try on': 'probarse (ropa)',
  'look for': 'buscar',
  'look after': 'cuidar',
  'find out': 'averiguar, descubrir',
  'come back': 'volver',
  'come in': 'entrar, pasar',
  'go back': 'regresar',
  'go out': 'salir',
  'go on': 'continuar, seguir',
  'go up': 'subir',
  'pick up': 'recoger',
  'put on': 'ponerse (ropa)',
  'take off': 'quitarse (ropa), despegar (avión)',
  'take out': 'sacar',
  'give up': 'rendirse, dejar de',
  'run out': 'acabarse, quedarse sin (run out of)',
  'fill in': 'llenar (un formulario)',
  'set up': 'instalar, configurar',
  'sign up': 'inscribirse',
  'slow down': 'ir más despacio',
  'hurry up': 'apurarse',
  'calm down': 'calmarse',
  'blow out': 'soplar (para apagar)',
  'break down': 'dañarse (una máquina)',
  'throw away': 'botar (a la basura)',
  'clean up': 'limpiar, ordenar',
  'write down': 'anotar',
  'check in': 'registrarse (hotel, aeropuerto)',
  'top up': 'recargar (el saldo o el plan del celular)',
  'grow up': 'crecer',
  // ── B1 ──
  'set off': 'salir de viaje, ponerse en marcha',
  'pay in': 'ingresar dinero (en el banco)',
  'pay back': 'devolver (dinero), pagar (una deuda)',
  'plug in': 'enchufar',
  'take on': 'contratar, asumir (un trabajo)',
  'get on with': 'llevarse bien con',
  'fall out': 'pelearse',
  'make up': 'reconciliarse; inventar (una historia)',
  'run out of': 'quedarse sin',
  'lift up': 'levantar',
  'pull down': 'bajar, tirar hacia abajo',
  'push aside': 'apartar, empujar a un lado',
  'climb up': 'trepar, subir (escalando)',
  'switch on': 'encender',
  'switch off': 'apagar',
  'put down': 'dejar, poner en el suelo',
  'turn around': 'darse la vuelta',
  'look up': 'buscar (información)',
  'take apart': 'desarmar',
  'hand in': 'entregar (un trabajo)',
  'look forward to': 'tener ganas de, esperar con ilusión',
}

const IRREGULAR: Record<string, string[]> = {
  get: ['got', 'gotten'], wake: ['woke', 'woken'], sit: ['sat'], stand: ['stood'], come: ['came'], go: ['went', 'gone', 'goes'],
  take: ['took', 'taken'], find: ['found'], give: ['gave', 'given'], run: ['ran'], blow: ['blew', 'blown'], break: ['broke', 'broken'],
  throw: ['threw', 'thrown'], write: ['wrote', 'written'], grow: ['grew', 'grown'], put: [], set: [],
  pay: ['paid'], make: ['made'], fall: ['fell', 'fallen'], hand: [],
}

/** Todas las formas de un verbo: gets, got, getting… */
function verbForms(v: string): Set<string> {
  const f = new Set([v, `${v}s`, `${v}es`, `${v}ed`, `${v}ing`, `${v}${v.slice(-1)}ing`, `${v}${v.slice(-1)}ed`, ...(IRREGULAR[v] ?? [])])
  if (v.endsWith('e')) f.add(`${v.slice(0, -1)}ing`).add(`${v}d`)
  if (v.endsWith('y')) f.add(`${v.slice(0, -1)}ies`).add(`${v.slice(0, -1)}ied`)
  return f
}
/** Los que se pueden separar ("turn it on", "pick the box up"); los demás van juntos */
const SEPARABLE = new Set([
  'wake up', 'turn on', 'turn off', 'try on', 'pick up', 'put on', 'take off', 'take out', 'fill in', 'set up', 'blow out', 'throw away', 'clean up', 'write down',
  // B1
  'plug in', 'take on', 'make up', 'lift up', 'pull down', 'push aside', 'switch on', 'switch off', 'put down', 'take apart', 'hand in', 'pay in', 'pay back', 'look up',
])
/** ¿El phrasal verb se puede separar? ("turn it on" sí; "climb up it", no se separa) */
export const isSeparable = (phrase: string) => SEPARABLE.has(phrase.toLowerCase())
/** Palabras que no pueden ir entre el verbo y la partícula ("go to school on the bus" no es "go on") */
const NOT_BETWEEN = new Set(['to', 'at', 'for', 'with', 'from', 'of', 'and', 'but', 'or', 'by', 'into', 'in', 'on', 'up', 'off', 'out', 'down', 'back', 'away', 'is', 'are', 'was', 'were'])
/** Phrasal verbs de tres palabras: entre la partícula y la última puede ir una palabra ("get on well with") */
const PHRASAL_FORMS = Object.keys(PHRASAL).map((p) => {
  const [verb, particle, ...rest] = p.split(' ')
  return { phrase: p, forms: verbForms(verb), particle, rest, gap: SEPARABLE.has(p) ? 2 : 0 }
})

/**
 * Busca un phrasal verb alrededor de la palabra tocada (words = palabras de la frase, i = la tocada).
 * El verbo y la partícula pueden estar separados por hasta 2 palabras ("pick the box up", "turn it on").
 * Los de tres palabras ("get on with", "run out of") ganan a los de dos si la frase los tiene completos.
 */
export function phrasalAt(words: string[], i: number): { phrase: string; meaning: string } | null {
  const w = words.map(normalizeWord)
  const ends = (k: number) => /[.,!?;:]$/.test(words[k] ?? '')
  let best: { phrase: string; size: number } | null = null
  for (const { phrase, forms, particle, rest, gap } of PHRASAL_FORMS) {
    // Posibles lugares del verbo: la palabra tocada o alguna antes
    for (let v = Math.max(0, i - 8); v <= i; v++) {
      if (!forms.has(w[v])) continue
      // La partícula, justo después o separada por hasta `gap` palabras
      let p = -1
      for (let k = v + 1; k <= v + 1 + gap && k < w.length; k++) {
        if (w[k] === particle) {
          p = k
          break
        }
        if (ends(k) || NOT_BETWEEN.has(w[k])) break
      }
      if (p < 0 || ends(v)) continue
      // Las palabras que siguen (tres palabras): cada una justo después, o con una palabra en medio ("get on well with")
      const used = [v, p]
      let last = p
      let ok = true
      for (const r of rest) {
        if (ends(last)) {
          ok = false
          break
        }
        if (w[last + 1] === r) last = last + 1
        else if (w[last + 2] === r && !ends(last + 1) && !NOT_BETWEEN.has(w[last + 1])) last = last + 2
        else {
          ok = false
          break
        }
        used.push(last)
      }
      if (!ok || !used.includes(i)) continue
      const size = 2 + rest.length
      if (!best || size > best.size) best = { phrase, size }
    }
  }
  return best ? { phrase: best.phrase, meaning: PHRASAL[best.phrase] } : null
}
