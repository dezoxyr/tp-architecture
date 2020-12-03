<?php

namespace App\Controller;

use App\Repository\BookingRepository;
use App\Entity\Booking;
use App\Repository\CustomerRepository;
use App\Repository\TicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MainController extends AbstractController
{
    /**
     * @Route("/tickets/available", name="ticket_available", methods={"GET"})
     */
    public function ticket_available(SerializerInterface $serializer, TicketRepository $ticket_repo): Response
    {
        $models = $ticket_repo->findWithoutBooking();
        $ret = $serializer->serialize($models, 'json', ['groups' => 'tickets_available']);
        return new Response($ret, 200, ['Content-Type' => 'application/json']);
    }

    /**
     * @Route("/tickets/booking", name="booking_ticket", methods={"PATCH"})
     */
    public function booking_ticket(SerializerInterface $serializer, TicketRepository $ticket_repo, CustomerRepository $customer_repo, EntityManagerInterface $em, Request $req): Response
    {
        if(!intval($req->get('id_customer')) || !intval($req->get('id_ticket')))
        {
            throw new BadRequestHttpException('Missing parameters');
        }

        $customer = $customer_repo->findById(intval($req->get('id_customer')));
        $ticket = $ticket_repo->findById(intval($req->get('id_ticket')));
        if($customer == null || $ticket == null)
        {
            throw new NotFoundHttpException('Ticket or customer not found');
        }
        $booking = new Booking();
        $booking->setCustomer($customer);
        $booking->setTicket($ticket);
        $ticket->setBooking($booking);

        $em->persist($booking);
        $em->persist($ticket);
        $em->flush();

        return new Response();
    }

    /**
     * @Route("/booking/customer/{id}", name="booking_customer", requirements={"id"="\d+"})
     */
    public function booking_customer(SerializerInterface $serializer, BookingRepository $bookingRepository, CustomerRepository $customer_repo, int $id): Response{

        $customer = $customer_repo->findById($id);
        if($customer == null)
        {
            throw new NotFoundHttpException('Customer not found');
        }
        $models = $bookingRepository->finbByCustomer($customer);

        $ret = $serializer->serialize($models, 'json', ['groups' => 'booking_customer']);
        return new Response($ret, 200, ['Content-Type' => 'application/json']);
    }

    /*
     * @Route("/create", name="create")
     */
    /*
    public function create(EntityManagerInterface $em) : Response
    {
        $france = new Country();
        $france->setName('France');

        $paris = new City();
        $paris->setName('Paris');
        $paris->setCountry($france);
        $air1 = new Airport();
        $air1->setName('Charles de Gaulle');
        $air1->setCity($paris);
        $air1->setCode('CDG');

        $us = new Country();
        $us->setName('Etats-Unis');

        $ny = new City();
        $ny->setName('New York');
        $ny->setCountry($us);
        $air2 = new Airport();
        $air2->setName('John Fitzgerald Kennedy');
        $air2->setCode('JFK');
        $air2->setCity($ny);

        $det = new City();
        $det->setName('Detroit');
        $det->setCountry($us);
        $air3 = new Airport();
        $air3->setName('Detroit airport');
        $air3->setCode('DTW');
        $air3->setCity($det);

        $t1 = new Ticket();
        $t1->setDeparture($air1);
        $t1->setArrival($air2);
        $t1->setPrice(300.0);

        $t2 = new Ticket();
        $t2->setDeparture($air1);
        $t2->setArrival($air2);
        $t2->setPrice(999.99);

        $t3 = new Ticket();
        $t3->setDeparture($air1);
        $t3->setArrival($air2);
        $t3->setPrice(561.64);

        $t4 = new Ticket();
        $t4->setDeparture($air2);
        $t4->setArrival($air1);
        $t4->setPrice(492.0);

        $t5 = new Ticket();
        $t5->setDeparture($air2);
        $t5->setArrival($air1);
        $t5->setPrice(492.0);

        $t6 = new Ticket();
        $t6->setDeparture($air2);
        $t6->setArrival($air3);
        $t6->setPrice(315.90);

        $t7 = new Ticket();
        $t7->setDeparture($air3);
        $t7->setArrival($air2);
        $t7->setPrice(103.6);

        $t8 = new Ticket();
        $t8->setDeparture($air1);
        $t8->setArrival($air2);
        $t8->setPrice(802.6);

        $t9 = new Ticket();
        $t9->setDeparture($air1);
        $t9->setArrival($air2);
        $t9->setPrice(465.94);

        $vali = new Customer();
        $vali->setName('Le floch');
        $vali->setSurname('Valentin');
        $vali->setMail('val.lefloch@mail.com');

        $em->persist($t1);
        $em->persist($t2);
        $em->persist($t3);
        $em->persist($t4);
        $em->persist($t5);
        $em->persist($t6);
        $em->persist($t7);
        $em->persist($t8);
        $em->persist($t9);
        $em->persist($vali);
        $em->flush();

        return JsonResponse::create([]);
    }*/
}
