--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

-- Started on 2019-05-20 03:22:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 26844)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    item_id bigint NOT NULL,
    deadline date,
    dependent_item_id bigint,
    description character varying(255),
    name character varying(255),
    status boolean,
    list_id bigint
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 26842)
-- Name: items_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_item_id_seq OWNER TO postgres;

--
-- TOC entry 2842 (class 0 OID 0)
-- Dependencies: 196
-- Name: items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_item_id_seq OWNED BY public.items.item_id;


--
-- TOC entry 199 (class 1259 OID 26855)
-- Name: to_do_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.to_do_lists (
    list_id bigint NOT NULL,
    name character varying(255),
    user_id bigint
);


ALTER TABLE public.to_do_lists OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 26853)
-- Name: to_do_lists_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.to_do_lists_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.to_do_lists_list_id_seq OWNER TO postgres;

--
-- TOC entry 2843 (class 0 OID 0)
-- Dependencies: 198
-- Name: to_do_lists_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.to_do_lists_list_id_seq OWNED BY public.to_do_lists.list_id;


--
-- TOC entry 201 (class 1259 OID 26863)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    email character varying(255),
    name character varying(255),
    password character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 26861)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 2844 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2699 (class 2604 OID 26847)
-- Name: items item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN item_id SET DEFAULT nextval('public.items_item_id_seq'::regclass);


--
-- TOC entry 2700 (class 2604 OID 26858)
-- Name: to_do_lists list_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.to_do_lists ALTER COLUMN list_id SET DEFAULT nextval('public.to_do_lists_list_id_seq'::regclass);


--
-- TOC entry 2701 (class 2604 OID 26866)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 2832 (class 0 OID 26844)
-- Dependencies: 197
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (item_id, deadline, dependent_item_id, description, name, status, list_id) FROM stdin;
\.


--
-- TOC entry 2834 (class 0 OID 26855)
-- Dependencies: 199
-- Data for Name: to_do_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.to_do_lists (list_id, name, user_id) FROM stdin;
\.


--
-- TOC entry 2836 (class 0 OID 26863)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, email, name, password) FROM stdin;
\.


--
-- TOC entry 2845 (class 0 OID 0)
-- Dependencies: 196
-- Name: items_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_item_id_seq', 1, false);


--
-- TOC entry 2846 (class 0 OID 0)
-- Dependencies: 198
-- Name: to_do_lists_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.to_do_lists_list_id_seq', 1, false);


--
-- TOC entry 2847 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- TOC entry 2703 (class 2606 OID 26852)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (item_id);


--
-- TOC entry 2705 (class 2606 OID 26860)
-- Name: to_do_lists to_do_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.to_do_lists
    ADD CONSTRAINT to_do_lists_pkey PRIMARY KEY (list_id);


--
-- TOC entry 2707 (class 2606 OID 26871)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2709 (class 2606 OID 26877)
-- Name: to_do_lists fkphtwg68fp7oraodsajjq032it; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.to_do_lists
    ADD CONSTRAINT fkphtwg68fp7oraodsajjq032it FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 2708 (class 2606 OID 26872)
-- Name: items fktqonpb17efhxjskx0ommw2pmw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT fktqonpb17efhxjskx0ommw2pmw FOREIGN KEY (list_id) REFERENCES public.to_do_lists(list_id);


-- Completed on 2019-05-20 03:22:44

--
-- PostgreSQL database dump complete
--

