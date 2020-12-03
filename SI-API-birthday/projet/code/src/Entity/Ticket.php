<?php

namespace App\Entity;

use App\Repository\TicketRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TicketRepository::class)
 */
class Ticket
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Airport::class, inversedBy="arrival", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"tockets_available"})
     */
    private $departure;

    /**
     * @ORM\ManyToOne(targetEntity=Airport::class, inversedBy="tickets", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"tockets_available"})
     */
    private $arrival;

    /**
     * @ORM\Column(type="float")
     * @Groups({"tockets_available"})
     */
    private $price;

    /**
     * @ORM\OneToOne(targetEntity=Booking::class, mappedBy="ticket", cascade={"persist", "remove"})
     * @ORM\JoinColumn
     */
    private $booking;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDeparture(): ?Airport
    {
        return $this->departure;
    }

    public function setDeparture(?Airport $departure): self
    {
        $this->departure = $departure;

        return $this;
    }

    public function getArrival(): ?Airport
    {
        return $this->arrival;
    }

    public function setArrival(?Airport $arrival): self
    {
        $this->arrival = $arrival;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getBooking(): ?Booking
    {
        return $this->booking;
    }

    public function setBooking(Booking $booking): self
    {
        $this->booking = $booking;

        // set the owning side of the relation if necessary
        if ($booking->getTicket() !== $this) {
            $booking->setTicket($this);
        }

        return $this;
    }
}
