<?php

namespace App\Entity;

use App\Repository\AirportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AirportRepository::class)
 */
class Airport
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=3)
     */
    private $code;

    /**
     * @ORM\ManyToOne(targetEntity=City::class, inversedBy="airports", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $city;

    /**
     * @ORM\OneToMany(targetEntity=Ticket::class, mappedBy="departure", orphanRemoval=true)
     */
    private $departure_tickets;

    /**
     * @ORM\OneToMany(targetEntity=Ticket::class, mappedBy="arrival", orphanRemoval=true)
     */
    private $arrival_tickets;

    public function __construct()
    {
        $this->departure_tickets = new ArrayCollection();
        $this->arrival_tickets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return Collection|Ticket[]
     */
    public function getDepartureTickets(): Collection
    {
        return $this->departure_tickets;
    }

    public function addDepartureTickets(Ticket $departureticket): self
    {
        if (!$this->departure_tickets->contains($departureticket)) {
            $this->departure_tickets[] = $departureticket;
            $departureticket->setDeparture($this);
        }

        return $this;
    }

    public function removeDepartureTickets(Ticket $departureticket): self
    {
        if ($this->departure_tickets->removeElement($departureticket)) {
            // set the owning side to null (unless already changed)
            if ($departureticket->getDeparture() === $this) {
                $departureticket->setDeparture(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Ticket[]
     */
    public function getArrivalTickets(): Collection
    {
        return $this->arrival_tickets;
    }

    public function addArrivalTickets(Ticket $departureticket): self
    {
        if (!$this->arrival_tickets->contains($departureticket)) {
            $this->arrival_tickets[] = $departureticket;
            $departureticket->setArrival($this);
        }

        return $this;
    }

    public function removeArrivalTickets(Ticket $departureticket): self
    {
        if ($this->arrival_tickets->removeElement($departureticket)) {
            // set the owning side to null (unless already changed)
            if ($departureticket->getArrival() === $this) {
                $departureticket->setArrival(null);
            }
        }

        return $this;
    }
}
